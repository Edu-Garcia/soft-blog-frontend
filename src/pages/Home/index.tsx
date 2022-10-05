import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdOutlineSearchOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { PostCard } from '../../components/PostCard';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import { IPost } from '../../interfaces';
import PostsService from '../../services/posts.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';

import './styles.scss';

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { signed } = useAuth();

  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async (): Promise<void> => {
    try {
      const data = await PostsService.getPosts();
      setPosts(data);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="home__header">
        <h1 className="home__header__title">Todas as postagens</h1>
        {signed && (
          <Button className="home__header__button" variant="primary" onClick={() => navigate('/postagens/acao')}>
            <BsPlusLg />
            Nova postagem
          </Button>
        )}
      </div>
      {posts.length ? (
        <div className="home__listPosts">
          {React.Children.toArray(
            posts.map((post) => (
              <PostCard
                id={post.id}
                title={post.title}
                author={post.user.name}
                category={post.category.title}
                createdAt={post.created_at}
              />
            ))
          )}
        </div>
      ) : (
        <h1 className="home__emptyListTitle">
          <MdOutlineSearchOff size={64} />
          Nenhuma postagem encontrada!
        </h1>
      )}
    </div>
  );
};

export default Home;
