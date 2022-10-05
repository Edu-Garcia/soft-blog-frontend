import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiCloudsmith } from 'react-icons/si';
import { MdOutlineLogout } from 'react-icons/md';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import Button from '../Button';

import './styles.scss';

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { signed, signOut, user } = useAuth();

  const isAdmin = user.role === 'admin';

  const currentPage = window.location.pathname;

  return (
    <header>
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
          <Button className="headerContainer__logout" variant="primary" onClick={() => signOut()}>
            <MdOutlineLogout />
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
