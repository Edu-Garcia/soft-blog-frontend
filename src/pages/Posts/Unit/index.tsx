import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import { IPost } from '../../../interfaces';
import PostsService from '../../../services/posts.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import ModalDelete from '../../../components/ModalDelete';
import formatDate from '../../../utils/formatDate';
import { useAuth } from '../../../contexts/AuthContext/useAuth';

import './styles.scss';

const Post: React.FunctionComponent = (): React.ReactElement => {
  const [post, setPost] = useState<IPost>({} as IPost);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const { user, signed } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const deletePost = async (postId: string): Promise<void> => {
    setLoader(true);
    try {
      await PostsService.delete(postId);
      toastMsg(ToastType.Success, 'Postagem excluída com sucesso!');
      navigate('/');
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    async function getPostById(): Promise<void> {
      setLoader(true);
      try {
        if (id) {
          const res = await PostsService.getPost(id);
          if (res) {
            setPost(res);
            setIsAuthor(res.user.id === user.id);
          }
        }
      } catch (error) {
        toastMsg(
          ToastType.Error,
          error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!'
        );
      } finally {
        setLoader(false);
      }
    }

    getPostById();
  }, [id, user.id]);

  return (
    <div className="post">
      <ModalDelete
        title="Deseja mesmo deletar a postagem?"
        show={showModalDelete}
        setShow={setShowModalDelete}
        id={post.id}
        deleteAction={deletePost}
      />
      <Header />
      <div className="post__header">
        <span className="post__header__author">
          <FaUserCircle size={32} color="#9ea8b5" />
          <span className="post__header__author__name">{post.user?.name}</span>
        </span>
        <span className="post__header__date">Publicado em {formatDate(post.created_at?.toString())}</span>
      </div>
      <div className="post__body">
        <div className="post__body__infos">
          <span className="post__body__infos__title">{post.title}</span>
          {signed && isAuthor && (
            <div className="post__body__infos__buttons">
              <Button variant="secondary" disabled={loader} onClick={() => navigate(`/postagens/acao/${post.id}`)}>
                <RiEdit2Fill />
                Editar
              </Button>
              <Button variant="danger" disabled={loader} onClick={() => deletePost(post.id)}>
                <RiDeleteBinFill />
                Excluir
              </Button>
            </div>
          )}
        </div>
        <span className="post__body__content">{post.content}</span>
      </div>
    </div>
  );
};

export default Post;
