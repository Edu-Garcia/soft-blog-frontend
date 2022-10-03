import React, { useEffect, useState } from 'react';
import { MdOutlineSearchOff } from 'react-icons/md';
import Header from '../../components/Header';
import { PostCard } from '../../components/PostCard';
import { IPost } from '../../interfaces';
import PostsService from '../../services/posts.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import './styles.scss';

const Home: React.FunctionComponent = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await PostsService.getPosts();
      setPosts(data);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // eslint-disable-next-line
  console.log(posts);

  return (
    <div className="home">
      <Header />
      <h1 className="home__title">Todas as postagens</h1>
      {posts.length ? (
        <div className="home__listPosts">
          {React.Children.toArray(
            posts.map((post) => (
              <PostCard
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
