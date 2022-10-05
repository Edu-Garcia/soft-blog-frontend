import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { SiCloudsmith } from 'react-icons/si';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SessionsService from '../../services/sessions.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import HttpClient from '../../services/httpClient';
import getTokenStorage from '../../utils/getTokenStorage';

import './styles.scss';

const loginSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

interface ILogin {
  email: string;
  password: string;
}

const defaultValue = {
  email: '',
  password: '',
} as ILogin;

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { signIn, signed } = useAuth();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ILogin);

  const handleSubmit = async (values: ILogin): Promise<void> => {
    try {
      setLoader(true);
      const { email, password } = values;

      const data = await SessionsService.create(email, password);
      signIn(data);

      if (data.token) {
        HttpClient.api.defaults.headers.common.Authorization = getTokenStorage();
        toastMsg(ToastType.Success, 'Login realizado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (signed) navigate('/');
    setInitialValues(defaultValue);
  }, [signed, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__logo">
          <h1 className="login__container__logo__title">
            <SiCloudsmith size={50} color="#5cd3a1" />
            SoftBlog
          </h1>
        </div>
        <div className="login__container__main">
          <h1 className="login__container__main__title">Login</h1>
          <div className="login__container__main__form">
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              enableReinitialize
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched }) => (
                <Form autoComplete="off">
                  <Input
                    id="email"
                    name="email"
                    as="input"
                    type="e-mail"
                    label="E-mail"
                    placeholder="Insira seu email"
                    disabled={loader}
                    className="login__container__main__form__input"
                    msg={errors.email}
                    isInvalid={(errors.email && touched.email) || false}
                    cy="test-inputEmail"
                  />
                  <Input
                    id="password"
                    name="password"
                    as="input"
                    type="password"
                    label="Senha"
                    placeholder="Insira sua senha"
                    disabled={loader}
                    className="login__container__main__form__input"
                    msg={errors.password}
                    isInvalid={(errors.password && touched.password) || false}
                    cy="test-inputPassword"
                  />
                  <p className="login__container__main__form__p">
                    Ainda não possui uma conta?{' '}
                    <a className="login__container__main__form__p__link" href="/register">
                      Cadastro
                    </a>
                  </p>
                  <div className="login__container__main__form__buttons">
                    <Button variant="secondary" onClick={() => navigate('/')}>
                      Home
                    </Button>
                    <Button type="submit">Entrar</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
