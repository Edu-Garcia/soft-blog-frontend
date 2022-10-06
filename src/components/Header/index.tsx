import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiCloudsmith } from 'react-icons/si';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { MdOutlineLogout } from 'react-icons/md';
import { AxiosError } from 'axios';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import Button from '../Button';
import ModalDelete from '../ModalDelete';
import toastMsg, { ToastType } from '../../utils/toastMsg';

import './styles.scss';
import UsersService from '../../services/users.service';

const Header: React.FunctionComponent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const { signed, signOut, user } = useAuth();

  const isAdmin = user.role === 'admin';
  const currentPage = window.location.pathname;

  const deleteUser = async (userId: string): Promise<void> => {
    setLoader(true);
    try {
      await UsersService.delete(userId);
      toastMsg(ToastType.Success, 'Conta excluída com sucesso!');
      signOut();
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  return (
    <header>
      <ModalDelete
        title="Deseja mesmo deletar sua conta?"
        show={showModal}
        setShow={setShowModal}
        id={user.id || ''}
        deleteAction={deleteUser}
      />
      <div className="headerContainer">
        <span className="headerContainer__title">
          <SiCloudsmith size={28} color="#5cd3a1" />
          <a href="/" className="headerContainer__title__link">
            SoftBlog
          </a>
        </span>

        {signed && (
          <div className="headerContainer__pages">
            <span className="headerContainer__pages__text">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="headerContainer__pages__text__button"
                disabled={currentPage === '/'}
              >
                Home
              </button>
              |
            </span>
            {isAdmin && (
              <span className="headerContainer__pages__text">
                <button
                  type="button"
                  onClick={() => navigate('/categorias')}
                  className="headerContainer__pages__text__button"
                  disabled={currentPage === '/categorias'}
                >
                  Categorias
                </button>
                |
              </span>
            )}
            <span className="headerContainer__pages__text">
              <button
                type="button"
                onClick={() => navigate('/postagens/me')}
                className="headerContainer__pages__text__button"
              >
                Minhas postagens
              </button>
            </span>
          </div>
        )}

        {!signed ? (
          <div className="headerContainer__buttonsContainer">
            <Button variant="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" onClick={() => navigate('/register')}>
              Cadastro
            </Button>
          </div>
        ) : (
          <div className="headerContainer__buttonsContainer">
            <DropdownButton title="Perfil">
              <DropdownItem
                onClick={() => {
                  if (!loader) navigate(`/usuarios/acao/${user.id}`);
                }}
              >
                Editar nome
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  if (!loader) setShowModal(true);
                }}
              >
                Excluir conta
              </DropdownItem>
            </DropdownButton>
            <Button className="headerContainer__buttonsContainer__logout" variant="primary" onClick={() => signOut()}>
              <MdOutlineLogout />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
