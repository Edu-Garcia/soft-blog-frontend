import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Header from '../../../components/Header';
import './styles.scss';

const validateSchema = yup.object().shape({
  name: yup.string().max(120, 'Máximo 50 caracteres').required('Campo obrigatório'),
});

interface IUpdate {
  name: string;
}

const defaultValue = {
  name: '',
} as IUpdate;

const ActionUser: React.FunctionComponent = (): React.ReactElement => {
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as IUpdate);

  const handleSubmit = async (values: IUpdate): Promise<void> => {
    try {
      setLoader(true);
      const { name } = values;

      if (id) {
        await UsersService.update(name, id);
        toastMsg(ToastType.Success, 'Nome editado com sucesso!');
      }
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    async function getUserById(): Promise<void> {
      setLoader(true);
      try {
        if (id) {
          const res = await UsersService.user(id);
          if (res) {
            setInitialValues(res);
          }
        }
      } catch (error) {
        toastMsg(
          ToastType.Error,
          error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!'
        );
      } finally {
        setLoader(false);
      }
    }

    getUserById();
  }, [id]);

  return (
    <div className="actions-container">
      <Header />
      <div className="body">
        <Row className="body__title">
          <Col md={12}>
            <Text as="h1" size="2rem" weight={700}>
              Editar nome
            </Text>
          </Col>
        </Row>
        <Row className="body__form">
          <Col md={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              enableReinitialize
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form autoComplete="off">
                  <Row className="body__form__container">
                    <Col md={12} className="mb-3">
                      <Input
                        cy="test-inputTitle"
                        isInvalid={(errors.name && touched.name) || false}
                        msg={errors.name}
                        label="Nome"
                        id="name"
                        name="name"
                        className="body__form__container__input"
                        as="input"
                        placeholder="Insira seu nome"
                      />
                    </Col>
                    <div className="submit-button">
                      <Button type="submit" disabled={loader} variant="primary" cy="test-create">
                        Alterar
                      </Button>
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ActionUser;
