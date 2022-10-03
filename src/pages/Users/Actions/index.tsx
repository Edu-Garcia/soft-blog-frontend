import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';

const createSchema = yup.object().shape({
  name: yup.string().min(2, 'Min. 2 caracteres').max(120, 'Máximo 120 caracteres').required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().min(2, 'Min. 2 caracteres').max(120, 'Máximo 120 caracteres').required('Campo obrigatório'),
});

interface ICreate {
  name: string;
  email: string;
  password: string;
}

const defaultValue = {
  name: '',
  email: '',
  password: '',
} as ICreate;

const Create: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ICreate);

  const handleSubmit = async (values: ICreate): Promise<void> => {
    try {
      setLoader(true);
      const { name, password, email } = values;

      if (id) {
        await UsersService.update(name, id);
        toastMsg(ToastType.Success, 'Atualização realizada com sucesso!');
      } else {
        await UsersService.create(name, password, email);
        toastMsg(ToastType.Success, 'Cadastro realizado com sucesso!');
      }
      navigate('/');
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    async function getUserById(): Promise<void> {
      try {
        if (!isCleaningUp && id) {
          const res = await UsersService.user(id);
          if (res) {
            const obj = { ...res } as ICreate;

            setInitialValues(obj);
          }
        }
      } catch (error) {
        toastMsg(ToastType.Error, (error as Error).message);
      }
    }

    getUserById();

    return () => {
      isCleaningUp = true;
    };
  }, [navigate, id]);

  return (
    <Section
      className="create"
      title={`${id ? 'Editar' : 'Criar'} conta`}
      description={`${id ? 'Editar' : 'Criar'} conta`}
    >
      <Row className="mb-5">
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            {id ? 'Editar' : 'Criar'} conta
          </Text>
          <Text as="small" size=".85rem" weight={400}>
            Os campos abaixo já contém validações configuradas para exemplo
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={createSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off">
                <Row>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputName"
                      isInvalid={(errors.name && touched.name) || false}
                      msg={errors.name}
                      label="Nome"
                      id="name"
                      name="name"
                      as="input"
                      placeholder="Insira seu nome"
                    />
                  </Col>
                  {!id && (
                    <>
                      <Col md={12} className="mb-3">
                        <Input
                          cy="test-inputPassword"
                          isInvalid={(errors.password && touched.password) || false}
                          msg={errors.password}
                          label="Senha"
                          id="password"
                          name="password"
                          as="input"
                          placeholder="Insira sua senha"
                        />
                      </Col>
                      <Col md={12} className="mb-3">
                        <Input
                          cy="test-inputEmail"
                          isInvalid={(errors.email && touched.email) || false}
                          msg={errors.email}
                          label="E-mail"
                          id="email"
                          name="email"
                          as="input"
                          placeholder="Insira seu e-mail"
                        />
                      </Col>
                    </>
                  )}
                  <Col md={12} className="mt-3">
                    <Button type="submit" disabled={loader} variant="primary" cy="test-create">
                      {id ? 'Editar informações' : 'Cadastrar-se'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Section>
  );
};

export default Create;
