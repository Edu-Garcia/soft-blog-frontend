import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// components;
import Loader from '../components/Loader';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext/useAuth';
import checkTokenIsValid from '../utils/checkTokenIsValid';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Post = lazy(() => import('../pages/Posts/Unit'));
const MyPosts = lazy(() => import('../pages/Posts/List'));
const MyPostActions = lazy(() => import('../pages/Posts/Actions'));
const Categories = lazy(() => import('../pages/Categories/List'));
const CategoryActions = lazy(() => import('../pages/Categories/Actions'));
const Error = lazy(() => import('../pages/Error'));

interface IPrivateRouteProps {
  children: JSX.Element;
  redirectTo: string;
  onlyAdmin?: boolean;
}
const PrivateRoute = ({ children, redirectTo, onlyAdmin = false }: IPrivateRouteProps): React.ReactElement => {
  const { signed, user } = useAuth();

  const isValid = checkTokenIsValid('TOKEN_KEY');

  if (onlyAdmin) {
    if (user.role !== 'admin') return <Navigate to={redirectTo} />;
  }

  return isValid && signed ? children : <Navigate to={redirectTo} />;
};

const AppRoutes: React.FunctionComponent = () => (
  <div className="d-flex">
    <div className="d-flex flex-column p-0 w-100">
      <main>
        <React.Suspense fallback={<Loader />}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/postagens/:id"
                element={
                  <PrivateRoute redirectTo="/">
                    <Post />
                  </PrivateRoute>
                }
              />
              <Route
                path="/postagens/me"
                element={
                  <PrivateRoute redirectTo="/">
                    <MyPosts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/postagens/acao"
                element={
                  <PrivateRoute redirectTo="/">
                    <MyPostActions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/postagens/acao/:id"
                element={
                  <PrivateRoute redirectTo="/">
                    <MyPostActions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categorias"
                element={
                  <PrivateRoute redirectTo="/" onlyAdmin>
                    <Categories />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categorias/acao"
                element={
                  <PrivateRoute redirectTo="/" onlyAdmin>
                    <CategoryActions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categorias/acao/:id"
                element={
                  <PrivateRoute redirectTo="/" onlyAdmin>
                    <CategoryActions />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </AuthProvider>
        </React.Suspense>
      </main>
    </div>
  </div>
);

export default AppRoutes;
