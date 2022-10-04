import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { SiCloudsmith } from 'react-icons/si';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import Button from '../../components/Button';
// eslint-disable-next-line
import SessionsService from '../../services/sessions.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import './styles.scss';
import Input from '../../components/Input';

const loginSchema = yup.object().shape({
  cpf: yup.string().min(11, 'Min. 11 caracteres').max(14, 'Máximo 14 caracteres').required('Campo obrigatório'),
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
  // eslint-disable-next-line
  const { signIn, signed } = useAuth();

  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ILogin);

  const handleSubmit = async (values: ILogin): Promise<void> => {
    try {
      setLoader(true);
      const { email, password } = values;

      // eslint-disable-next-line
      console.log(email);
      // eslint-disable-next-line
      console.log(password);

      // const data = await SessionsService.create(email, password);
      // signIn(data);

      // if (data.token) {
      //   toastMsg(ToastType.Success, 'Login realizado com sucesso!');
      //   navigate('/');
      // }
    } catch (error) {
      toastMsg(ToastType.Error, 'Internal Server Error!');
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
              onSubmit={(values) => {
                // eslint-disable-next-line
                console.log('values');
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form autoComplete="off">
                  <Input
                    cy="test-inputEmail"
                    as="input"
                    isInvalid={(errors.email && touched.email) || false}
                    msg={errors.email}
                    label="E-mail"
                    id="email"
                    name="email"
                    placeholder="Insira seu email"
                    type="e-mail"
                  />
                  <Input
                    cy="test-inputPassword"
                    as="input"
                    isInvalid={(errors.email && touched.email) || false}
                    msg={errors.email}
                    label="Senha"
                    id="password"
                    name="password"
                    placeholder="Insira sua senha"
                    type="password"
                  />
                  <p className="login__container__main__form__p">
                    <a className="login__container__main__form__p__link" href="/register">
                      Cadastro
                    </a>
                  </p>
                  <div className="login__container__main__form__buttons">
                    <Button variant="secondary" onClick={() => navigate('/')}>
                      Início
                    </Button>
                    <Button type="submit" disabled={loader}>
                      Entrar
                    </Button>
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
