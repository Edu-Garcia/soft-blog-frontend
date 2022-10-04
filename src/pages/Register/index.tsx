import React from 'react';
import { SiCloudsmith } from 'react-icons/si';
import Button from '../../components/Button';
// import * as yup from 'yup';
import './styles.scss';

// const registerSchema = yup.object().shape({
//   cpf: yup.string().min(11, 'Min. 11 caracteres').max(14, 'Máximo 14 caracteres').required('Campo obrigatório'),
//   password: yup.string().required('Campo obrigatório'),
// });

// interface IRegister {
//   email: string;
//   password: string;
// }

// const defaultValue = {
//   email: '',
//   password: '',
// } as IRegister;

const Register: React.FunctionComponent = () => (
  // const [loader, setLoader] = useState<boolean>(false);
  // const [initialValues, setInitialValues] = useState(defaultValue as IRegister);

  <div className="register">
    <div className="register__container">
      <div className="register__container__main">
        <h1 className="register__container__main__title">Cadastro</h1>
        <div className="register__container__main__form">
          <p className="register__container__main__form__p">
            <a className="register__container__main__form__p__link" href="/login">
              Login
            </a>
          </p>
          <div className="register__container__main__form__buttons">
            <Button variant="secondary">Início</Button>
            <Button>Enviar</Button>
          </div>
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
export default Register;
