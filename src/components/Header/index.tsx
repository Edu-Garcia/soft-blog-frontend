import React from 'react';
import { SiCloudsmith } from 'react-icons/si';
import Button from '../Button';
import './styles.scss';

const Header: React.FunctionComponent = () => (
  <header>
    <div className="headerContainer">
      <span className="headerContainer__title">
        <SiCloudsmith size={28} color="#5cd3a1" />
        SoftBlog
      </span>

      <div className="headerContainer__buttonsContainer">
        <Button variant="primary">Login</Button>
        <Button variant="primary">Cadastro</Button>
      </div>
    </div>
  </header>
);

export default Header;
