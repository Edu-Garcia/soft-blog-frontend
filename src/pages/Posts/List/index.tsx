import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { MdOutlineSearchOff } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { IPost } from '../../../interfaces';
import PostsService from '../../../services/posts.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { useAuth } from '../../../contexts/AuthContext/useAuth';

import './styles.scss';
import { PostCard } from '../../../components/PostCard';

const Posts: React.FunctionComponent = (): React.ReactElement => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const { signed } = useAuth();

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoader(true);
      const data = await PostsService.getMyPosts();
      setPosts(data);
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  const deletePost = async (postId: string): Promise<void> => {
    setLoader(true);
    try {
      await PostsService.delete(postId);
      toastMsg(ToastType.Success, 'Postagem excluída com sucesso!');
      fetchPosts();
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    if (!isCleaningUp) {
      fetchPosts();
    }
    return () => {
      isCleaningUp = true;
    };
  }, []);

  return (
    <div className="posts">
      <Header />
      <div className="posts__header">
        <h1 className="posts__header__title">Minhas postagens</h1>
        {signed && (
          <Button
            className="home__header__button"
            variant="primary"
            disabled={loader}
            onClick={() => navigate('/postagens/acao')}
          >
            <BsPlusLg />
            Nova postagem
          </Button>
        )}
      </div>
      {posts.length ? (
        <div className="posts__list">
          {React.Children.toArray(
            posts.map((post) => (
              <PostCard
                id={post.id}
                title={post.title}
                author={post.user.name}
                category={post.category.title}
                createdAt={post.created_at}
                content={post.content}
                deletePost={deletePost}
              />
            ))
          )}
        </div>
      ) : (
        <h1 className="posts__emptyListTitle">
          <MdOutlineSearchOff size={64} />
          Nenhuma postagem criada!
        </h1>
      )}
    </div>
  );
};

export default Posts;
