import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './styles.scss';

const Error: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="errorPage">
      <h2 className="errorPage__h2">404</h2>
      <h4 className="errorPage__h4">Oops! Página não encontrada</h4>
      <p className="errorPage__text">
        <span>A página que você estava procurando não existe.</span>
        <span>Você pode ter digitado incorretamente o endereço ou a página pode ter sido redirecionada.</span>
      </p>
      <Button onClick={() => navigate('/')}>Página Inicial</Button>
    </div>
  );
};

export default Error;
