import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiCloudsmith } from 'react-icons/si';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import Button from '../Button';
import './styles.scss';

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { signed } = useAuth();

  return (
    <header>
      <div className="headerContainer">
        <span className="headerContainer__title">
          <SiCloudsmith size={28} color="#5cd3a1" />
          SoftBlog
        </span>

        {!signed && (
          <div className="headerContainer__buttonsContainer">
            <Button variant="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary">Cadastro</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
