import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import PostsService from '../../../services/posts.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import { ICategory } from '../../../interfaces';
import CategoriesService from '../../../services/categories.service';
import Header from '../../../components/Header';

import './styles.scss';

const createSchema = yup.object().shape({
  title: yup.string().max(100, 'Máximo 100 caracteres').required('Campo obrigatório'),
  content: yup.string().required('Campo obrigatório'),
  categoryId: yup.string().required('Campo obrigatório'),
});

const updateSchema = yup.object().shape({
  title: yup.string().max(100, 'Máximo 100 caracteres').required('Campo obrigatório'),
  content: yup.string().required('Campo obrigatório'),
});

interface ICreate {
  title: string;
  content: string;
  categoryId: string;
}

const defaultValue = {
  title: '',
  content: '',
  categoryId: '',
} as ICreate;

const ActionPost: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ICreate);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleSubmit = async (values: ICreate): Promise<void> => {
    try {
      setLoader(true);
      const { title, content, categoryId } = values;

      if (id) {
        await PostsService.update(title, content, id);
        toastMsg(ToastType.Success, 'Postagem editada com sucesso!');
      } else {
        await PostsService.create(title, content, categoryId);
        toastMsg(ToastType.Success, 'Postagem criada com sucesso!');
      }

      navigate('/');
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    async function getPostById(): Promise<void> {
      setLoader(true);
      try {
        const res = await PostsService.getPost(id as string);
        if (res) {
          setInitialValues({
            ...res,
            categoryId: res.category.id,
          });
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

    async function getCategories(): Promise<void> {
      setLoader(true);
      try {
        const res = await CategoriesService.getCategories();
        if (res) {
          setCategories(res);
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

    if (id) {
      getPostById();
    } else {
      getCategories();
    }
  }, [id]);

  return (
    <div className="actions-container">
      <Header />
      <div className="body">
        <Row className="body__title">
          <Col md={12}>
            <Text as="h1" size="2rem" weight={700}>
              {id ? 'Editar' : 'Criar'} postagem
            </Text>
          </Col>
        </Row>
        <Row className="body__form">
          <Col md={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={id ? updateSchema : createSchema}
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
                        label="Titulo"
                        id="title"
                        name="title"
                        className="body__form__container__input"
                        as="input"
                        placeholder="Insira um título para sua postagem"
                      />
                    </Col>
                    {!id && (
                      <Col md={12} className="mb-3">
                        <Input
                          cy="test-inputCategory"
                          isInvalid={(errors.categoryId && touched.categoryId) || false}
                          msg={errors.categoryId}
                          label="Categoria"
                          id="categoryId"
                          name="categoryId"
                          className="body__form__container__input selectText"
                          as="select"
                        >
                          <option value="" className="body__form__container__input__option" disabled>
                            Selecionar categoria
                          </option>
                          {React.Children.toArray(
                            categories.map((category) => (
                              <option className="body__form__container__input__option" value={category.id}>
                                {category.title}
                              </option>
                            ))
                          )}
                        </Input>
                      </Col>
                    )}
                    <Col md={12} className="mb-3">
                      <Input
                        cy="test-inputContent"
                        isInvalid={(errors.content && touched.content) || false}
                        msg={errors.content}
                        label="Conteúdo da postagem"
                        id="content"
                        name="content"
                        className="body__form__container__input"
                        as="textarea"
                        placeholder="Insira o conteúdo da sua postagem"
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

export default ActionPost;
