import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { MdOutlineSearchOff } from 'react-icons/md';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import { ICategory } from '../../../interfaces';
import CategoriesService from '../../../services/categories.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { useAuth } from '../../../contexts/AuthContext/useAuth';

import './styles.scss';

const Categories: React.FunctionComponent = (): React.ReactElement => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const { signed } = useAuth();

  const fetchCategories = async (): Promise<void> => {
    try {
      setLoader(true);
      const data = await CategoriesService.getCategories();
      setCategories(data);
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    } finally {
      setLoader(false);
    }
  };

  const deleteCategory = async (id: string): Promise<void> => {
    try {
      await CategoriesService.delete(id);
      toastMsg(ToastType.Success, 'Categoria excluída com sucesso!');
      fetchCategories();
    } catch (error) {
      toastMsg(ToastType.Error, error instanceof AxiosError ? error.response?.data.message : 'Internal Server Error!');
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    if (!isCleaningUp) {
      fetchCategories();
    }
    return () => {
      isCleaningUp = true;
    };
  }, []);

  return (
    <div className="categories">
      <Header />
      <div className="categories__header">
        <h1 className="categories__header__title">Lista de categorias</h1>
        {signed && (
          <Button variant="primary" onClick={() => navigate('/categorias/acao')}>
            Nova categoria
          </Button>
        )}
      </div>
      {categories.length ? (
        <div className="categories__list">
          {React.Children.toArray(
            categories.map((category) => (
              <div className="categories__list__item">
                <span className="categories__list__item__title">{category.title}</span>
                <div className="categories__list__item__buttons">
                  <RiEdit2Fill
                    className="cursor-pointer"
                    size={18}
                    color="#5cd3a1"
                    onClick={() => {
                      if (!loader) navigate(`/categorias/acao/${category.id}`);
                    }}
                  />
                  <RiDeleteBinFill
                    className="cursor-pointer"
                    size={18}
                    color="#b02a37"
                    onClick={() => {
                      if (!loader) deleteCategory(category.id);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <h1 className="categories__emptyListTitle">
          <MdOutlineSearchOff size={64} />
          Nenhuma categoria encontrada!
        </h1>
      )}
    </div>
  );
};

export default Categories;
