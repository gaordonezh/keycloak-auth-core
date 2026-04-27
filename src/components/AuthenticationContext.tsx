import { createContext, Fragment, useContext, useLayoutEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";
import type { AuthenticationContextProps, AuthenticationProviderProps } from "../types";
import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

let keycloakIntance: Keycloak | undefined;

const getValidToken = async (): Promise<string> => {
  try {
    if (keycloakIntance?.token) {
      await keycloakIntance.updateToken();
      return keycloakIntance.token;
    } else {
      return "";
    }
  } catch (err) {
    console.log("ERROR GETVALIDTOKEN:", err);
    keycloakIntance?.login();
    throw err;
  }
};

export const createKeycloakAxiosInstance = (initConfig?: CreateAxiosDefaults<any>): AxiosInstance => {
  const api = axios.create(initConfig);

  api.interceptors.request.use(async (config) => {
    const token = await getValidToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};

const Authentication = createContext({} as AuthenticationContextProps);

export const useAuthentication = (): AuthenticationContextProps => useContext(Authentication);

const AuthenticationProvider = (props: AuthenticationProviderProps) => {
  const { children, accessName, options, omitGlobalAuth, checkLoginIframe } = props;

  const [loadingAuthentication, setLoadingAuthentication] = useState(false);
  const [denyApplicationAccess, setDenyApplicationAccess] = useState(false);

  useLayoutEffect(() => {
    initAndValidateKeycloak();
  }, []);

  const initAndValidateKeycloak = async () => {
    try {
      setLoadingAuthentication(true);
      const instance = new Keycloak(options);
      await instance.init({
        onLoad: omitGlobalAuth ? "check-sso" : "login-required",
        checkLoginIframe,
      });

      keycloakIntance = instance;

      if (!instance.authenticated || !instance.tokenParsed) return;

      const hasAccess = instance.hasResourceRole(accessName);
      if (!hasAccess) setDenyApplicationAccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuthentication(false);
    }
  };

  const handleLogout = () => {
    keycloakIntance?.logout();
  };

  const handleClose = () => {
    globalThis.location.href = "https://www.google.com/";
  };

  const handleReload = () => {
    globalThis.location.reload();
  };

  const handleLogin = () => {
    keycloakIntance?.login();
  };

  const values: AuthenticationContextProps = useMemo(
    () => ({
      userInfo: keycloakIntance?.tokenParsed!,
      handleLogout,
      handleLogin,
    }),
    [keycloakIntance],
  );

  const instanceValidation = !loadingAuthentication && keycloakIntance?.authenticated && !denyApplicationAccess;
  const accessValidation = omitGlobalAuth && !denyApplicationAccess;

  return (
    <Authentication.Provider value={values}>
      {instanceValidation || accessValidation ? (
        children
      ) : (
        <main className="sso__container">
          <h1 className="sso__title">SSO NETAPPPERU SAC</h1>

          {loadingAuthentication ? (
            <svg width={75} height={75} fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <linearGradient id="loaderGradient">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
              </linearGradient>
              <circle cx="10" cy="10" r="8" id="sso__circle__loader" strokeWidth="1" />
            </svg>
          ) : (
            <Fragment>
              {denyApplicationAccess ? (
                <Fragment>
                  <div>
                    <h3 className="sso__subtitle">No podemos continuar...</h3>
                    <p>Usted no tiene acceso a este sistema</p>
                    <p>Contacte con el administrador para una mejor orientación</p>
                  </div>

                  <div className="sso__actions sso__mt">
                    <button className="sso__button" onClick={handleClose}>
                      SALIR
                    </button>
                    <button className="sso__button" onClick={handleLogout}>
                      CERRAR SESIÓN
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {keycloakIntance?.authenticated ? (
                    <p className="sso__subtitle">AUTENTICADO</p>
                  ) : (
                    <Fragment>
                      <p>
                        Por favor, espere un <b>par de minutos</b> y vuelva a intentarlo.
                      </p>

                      <div className="sso__actions sso__mt">
                        <button className="sso__button" onClick={handleReload}>
                          VOLVER A CARGAR
                        </button>
                        <button className="sso__button" onClick={handleLogin}>
                          INICIAR SESIÓN
                        </button>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </main>
      )}
    </Authentication.Provider>
  );
};

export default AuthenticationProvider;
