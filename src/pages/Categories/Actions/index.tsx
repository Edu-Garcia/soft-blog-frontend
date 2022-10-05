import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import CategoriesService from '../../../services/categories.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Header from '../../../components/Header';
// import './styles.scss';

const validateSchema = yup.object().shape({
  title: yup.string().max(50, 'Máximo 50 caracteres').required('Campo obrigatório'),
});

interface ICreate {
  title: string;
}

const defaultValue = {
  title: '',
} as ICreate;

const ActionCategory: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ICreate);

  const handleSubmit = async (values: ICreate): Promise<void> => {
    try {
      setLoader(true);
      const { title } = values;

      if (id) {
        await CategoriesService.update(title, id);
        toastMsg(ToastType.Success, 'Categoria editada com sucesso!');
      } else {
        await CategoriesService.create(title);
        toastMsg(ToastType.Success, 'Categoria criada com sucesso!');
      }

      navigate('/');
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    async function getCategoryById(): Promise<void> {
      setLoader(true);
      try {
        if (id) {
          const res = await CategoriesService.getCategory(id as string);
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

    getCategoryById();
  }, [id]);

  return (
    <div className="actions-container">
      <Header />
      <div className="body">
        <Row className="body__title">
          <Col md={12}>
            <Text as="h1" size="2rem" weight={700}>
              {id ? 'Editar' : 'Criar'} categoria
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
                        isInvalid={(errors.title && touched.title) || false}
                        msg={errors.title}
                        label="Título"
                        id="title"
                        name="title"
                        className="body__form__container__input"
                        as="input"
                        placeholder="Insira um título para a categoria"
                      />
                    </Col>
                    <div className="submit-button">
                      <Button type="submit" disabled={loader} variant="primary" cy="test-create">
                        {id ? 'Alterar' : 'Publicar'}
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

export default ActionCategory;
