import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { SiCloudsmith } from 'react-icons/si';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import UsersService from '../../services/users.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';

import './styles.scss';

const registerSchema = yup.object().shape({
  name: yup.string().max(120, 'Máximo 120 caracteres').required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

interface IRegister {
  name: string;
  email: string;
  password: string;
}

const defaultValue = {
  name: '',
  email: '',
  password: '',
} as IRegister;

const Register: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as IRegister);

  const handleSubmit = async (values: IRegister): Promise<void> => {
    try {
      setLoader(true);
      const { name, email, password } = values;

      const data = await UsersService.create(name, email, password);

      if (data) {
        toastMsg(ToastType.Success, 'Cadastro realizado com sucesso!');
        navigate('/login');
      }
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setInitialValues(defaultValue);
  }, [navigate]);

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__container__main">
          <h1 className="register__container__main__title">Cadastro</h1>
          <div className="register__container__main__form">
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              enableReinitialize
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched }) => (
                <Form autoComplete="off">
                  <Input
                    id="name"
                    name="name"
                    as="input"
                    label="Nome"
                    placeholder="Insira seu nome"
                    disabled={loader}
                    className="register__container__main__form__input"
                    msg={errors.name}
                    isInvalid={(errors.name && touched.name) || false}
                    cy="test-inputName"
                  />
                  <Input
                    id="email"
                    name="email"
                    as="input"
                    type="e-mail"
                    label="E-mail"
                    placeholder="Insira seu email"
                    disabled={loader}
                    className="register__container__main__form__input"
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
                    className="register__container__main__form__input"
                    msg={errors.password}
                    isInvalid={(errors.password && touched.password) || false}
                    cy="test-inputPassword"
                  />
                  <p className="register__container__main__form__p">
                    Já possui uma conta?{' '}
                    <a className="register__container__main__form__p__link" href="/login">
                      Login
                    </a>
                  </p>
                  <div className="register__container__main__form__buttons">
                    <Button variant="secondary" onClick={() => navigate('/')}>
                      Home
                    </Button>
                    <Button type="submit">Enviar</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="register__container__logo">
          <h1 className="register__container__logo__title">
            <SiCloudsmith size={50} color="#5cd3a1" />
            SoftBlog
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Register;
