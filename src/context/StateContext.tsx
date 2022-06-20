import React, { createContext, useContext, useState, useEffect } from "react";
import { PasswordItemsI } from "../types/PasswordItemsType";
import { LoginI } from "../types/RegistrationTypes";
import { UserI } from "../types/UserTypes";

const Context = createContext<any | null>(null);

export const StateContext: React.FC<any> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [user, setUser] = useState<UserI | null>(null);

  const logout = () => {
    localStorage.setItem("isAuth", JSON.stringify(false));
    setIsAuth(false);
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("isAuth") || "false");
    setIsAuth(auth);
  }, []);

  const updateUser = (value: any) => {
    setUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  };
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    setUser(user);
  };

  const addPassword = (newPassword: PasswordItemsI) => {
    const updatedValue = {
      ...user,
      passwordsItems: [...(user?.passwordsItems || []), newPassword],
    };
    updateUser(updatedValue);
  };
  const deletePasswordItem = (id: number) => {
    const updatedValue = user?.passwordsItems.filter(
      (item: PasswordItemsI) => item.id !== id
    ) as PasswordItemsI[];

    updateUser({
      ...user,
      passwordsItems: [...updatedValue],
    });
  };

  const editPassword = (value: PasswordItemsI) => {
    const updatedValue = user?.passwordsItems.map((item: PasswordItemsI) => {
      return item.id === value.id ? value : item;
    }) as PasswordItemsI[];

    updateUser({
      ...user,
      passwordsItems: [...updatedValue],
    });
  };

  const registration = (value: UserI) => {
    localStorage.setItem("user", JSON.stringify(value));
    localStorage.setItem("isAuth", JSON.stringify(true));
    setIsAuth(true);
  };

  const login = (loginData: LoginI) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const isUserExist =
      user.email === loginData.email && user.password === loginData.password;

    if (isUserExist) {
      setIsAuth(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  return (
    <Context.Provider
      value={{
        isAuth,
        user,
        getUser,
        logout,
        addPassword,
        registration,
        deletePasswordItem,
        editPassword,
        login,
        authError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
