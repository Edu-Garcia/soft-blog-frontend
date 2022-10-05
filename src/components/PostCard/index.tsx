import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

import './styles.scss';
import ModalDelete from '../ModalDelete';

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  category: string;
  createdAt: Date;
  deletePost?: (id: string) => void;
  content?: string;
}

export function PostCard({
  id,
  title,
  author,
  category,
  createdAt,
  deletePost,
  content,
}: PostCardProps): React.ReactElement {
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  // const deletePost = async (postId: string): Promise<void> => {
  //   setLoader(true);
  //   try {
  //     await PostsService.delete(postId);
  //     toastMsg(ToastType.Success, 'Postagem excluída com sucesso!');
  //   } catch (error) {
  //     toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__header__author">
          <FaUserCircle size={28} color="#9ea8b5" />
          <span className="card__header__author__name">{author}</span>
        </span>
        <span className="card__header__date">{formatDate(createdAt.toString())}</span>
      </div>
      <div className="card__body">
        <button type="button" onClick={() => navigate(`/postagens/${id}`)} className="card__body__title">
          {title}
        </button>
        {content && deletePost && (
          <>
            <ModalDelete
              title="Deseja mesmo deletar a postagem?"
              show={showModalDelete}
              setShow={setShowModalDelete}
              id={id}
              deleteAction={deletePost}
            />
            <div className="card__body__buttons">
              <RiEdit2Fill
                className="cursor-pointer"
                size={20}
                color="#5cd3a1"
                onClick={() => navigate(`/postagens/acao/${id}`)}
              />
              <RiDeleteBinFill
                className="cursor-pointer"
                size={20}
                color="#b02a37"
                onClick={() => setShowModalDelete(true)}
              />
            </div>
          </>
        )}
      </div>
      {content && <p className="card__content">{content}</p>}
      <span className="card__category">{category}</span>
    </div>
  );
}
