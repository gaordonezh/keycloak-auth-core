import { createContext, Fragment, useContext, useLayoutEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";
import type { AuthenticationContextProps, AuthenticationProviderProps } from "../types";
import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

let keycloakIntance: Keycloak | undefined;

const getValidToken = async (): Promise<string> => {
  if (!keycloakIntance?.token) throw new Error("NEED AUTH");

  try {
    await keycloakIntance.updateToken();
    return keycloakIntance.token;
  } catch (err) {
    keycloakIntance.login();
    throw err;
  }
};

export const createKeycloakAxiosInstance = (initConfig?: CreateAxiosDefaults<any>): AxiosInstance => {
  const api = axios.create(initConfig);

  api.interceptors.request.use(async (config) => {
    const token = await getValidToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};

const Authentication = createContext({} as AuthenticationContextProps);

export const useAuthentication = (): AuthenticationContextProps => useContext(Authentication);

const AuthenticationProvider = (props: AuthenticationProviderProps) => {
  const { children, accessName, options, omitGlobalAuth } = props;

  const [loadingAuthentication, setLoadingAuthentication] = useState(false);
  const [denyApplicationAccess, setDenyApplicationAccess] = useState(false);

  useLayoutEffect(() => {
    initAndValidateKeycloak();
  }, []);

  const initAndValidateKeycloak = async () => {
    try {
      setLoadingAuthentication(true);
      const instance = new Keycloak(options);
      await instance.init({ onLoad: "check-sso", checkLoginIframe: true });

      keycloakIntance = instance;

      if (!instance.authenticated || !instance.tokenParsed) return;

      const hasAccess = instance.hasResourceRole(accessName);
      if (!hasAccess) {
        setDenyApplicationAccess(true);
        return;
      }
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

  const canContinue = !loadingAuthentication && keycloakIntance?.authenticated && !denyApplicationAccess;

  return (
    <Authentication.Provider value={values}>
      {canContinue || omitGlobalAuth ? (
        <Fragment>
          <code className="auth__codeblock">{`${options.realm} — ${options.clientId}`.toUpperCase()}</code>
          {children}
        </Fragment>
      ) : (
        <main className="auth__container">
          <h1 className="auth__title">SSO NETAPPPERU SAC</h1>

          {loadingAuthentication ? (
            <svg width={75} height={75} fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <linearGradient id="loaderGradient">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
              </linearGradient>
              <circle cx="10" cy="10" r="8" id="circle8932" strokeWidth="1" />
            </svg>
          ) : (
            <Fragment>
              {denyApplicationAccess ? (
                <Fragment>
                  <div>
                    <h3 className="auth__subtitle">No podemos continuar...</h3>
                    <p>Usted no tiene acceso a este sistema</p>
                    <p>Contacte con el administrador para una mejor orientación</p>
                  </div>

                  <div className="auth__actions">
                    <button className="auth__button" onClick={handleClose}>
                      SALIR
                    </button>
                    <button className="auth__button" onClick={handleLogout}>
                      CERRAR SESIÓN
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {keycloakIntance?.authenticated ? (
                    <p className="auth__subtitle">AUTENTICADO</p>
                  ) : (
                    <Fragment>
                      <p>Por favor, espere UN PAR DE MINUTOS y vuelva a cargar</p>
                      <button className="auth__button" onClick={handleReload}>
                        VOLVER A CARGAR
                      </button>
                      <button className="auth__button" onClick={handleLogin}>
                        INICIAR SESIÓN
                      </button>
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
