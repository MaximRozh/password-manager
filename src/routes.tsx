import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Route, Routes as Switch, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./context/StateContext";

interface IRoutes {
  path: string;
  component: React.ComponentType;
  name?: string;
}

export enum RouterNames {
  HOME = "/dashboard",
  LOGIN = "/login",
  REGISTRATION = "/registration",
}

const ProtectedRoute: React.FC<any> = ({ children, auth, path = "/login" }) => {
  if (!auth) {
    return <Navigate to={path} replace />;
  }
  return children ? children : <Outlet />;
};

const publickRoutes: IRoutes[] = [
  {
    path: RouterNames.LOGIN,
    component: Login,
  },
  {
    path: RouterNames.REGISTRATION,
    component: Registration,
  },
];

const privateRoutes: IRoutes[] = [
  {
    path: RouterNames.HOME,
    component: Main,
  },
];

const Routes = () => {
  const { isAuth } = useStateContext();
  return (
    <Switch>
      <Route path={"/"} element={<Navigate to={RouterNames.HOME} />} />
      <Route
        element={<ProtectedRoute auth={!isAuth} path={RouterNames.HOME} />}
      >
        {publickRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
      </Route>
      <Route element={<ProtectedRoute auth={isAuth} />}>
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
      </Route>
    </Switch>
  );
};
export default Routes;
