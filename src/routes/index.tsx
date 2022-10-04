import React, { lazy } from 'react';
import {
  Routes,
  Route,
  // Navigate
} from 'react-router-dom';

// components;
import Loader from '../components/Loader';
import { AuthProvider } from '../contexts/AuthContext';
// import { useAuth } from '../contexts/AuthContext/useAuth';
// import checkTokenIsValid from '../utils/checkTokenIsValid';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Users = lazy(() => import('../pages/Users/List'));
const Actions = lazy(() => import('../pages/Users/Actions'));
const Error = lazy(() => import('../pages/Error'));

// interface IPrivateRouteProps {
//   children: JSX.Element;
//   redirectTo: string;
// }
// const PrivateRoute = ({ children, redirectTo }: IPrivateRouteProps): React.ReactElement => {
//   const { signed } = useAuth();

//   const isValid = checkTokenIsValid('TOKEN_KEY');

//   return isValid && signed ? children : <Navigate to={redirectTo} />;
// };

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
              <Route path="/usuarios" element={<Users />} />
              <Route path="/usuarios/acao" element={<Actions />} />
              <Route path="/usuarios/acao/:id" element={<Actions />} />
              {/* <Route
                path="/usuarios"
                element={
                  <PrivateRoute redirectTo="/">
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuarios/acao"
                element={
                  <PrivateRoute redirectTo="/usuarios">
                    <Actions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuarios/acao/:id"
                element={
                  <PrivateRoute redirectTo="/usuarios">
                    <Actions />
                  </PrivateRoute>
                }
              /> */}
              <Route path="*" element={<Error />} />
            </Routes>
          </AuthProvider>
        </React.Suspense>
      </main>
    </div>
  </div>
);

export default AppRoutes;
