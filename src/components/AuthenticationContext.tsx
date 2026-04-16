import { createContext, Fragment, useContext, useEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";
import type { AuthenticationContextProps, AuthenticationProviderProps } from "../types";

const Authentication = createContext({} as AuthenticationContextProps);

export const useAuthentication = (): AuthenticationContextProps => useContext(Authentication);

const AuthenticationProvider = (props: AuthenticationProviderProps) => {
  const { children, appName, options } = props;
  const [keycloakIntance, setKeycloakIntance] = useState<Keycloak>();
  const [loadingAuthentication, setLoadingAuthentication] = useState(false);
  const [denyApplicationAccess, setDenyApplicationAccess] = useState(false);

  useEffect(() => {
    initAndValidateKeycloak();
  }, []);

  const initAndValidateKeycloak = async () => {
    try {
      setLoadingAuthentication(true);
      const instance = new Keycloak(options);
      await instance.init({ onLoad: "login-required" });
      if (!instance.authenticated || !instance.tokenParsed) return;

      const valid = validateApp(instance.tokenParsed.systems);
      if (!valid) {
        setDenyApplicationAccess(true);
        return;
      }

      setKeycloakIntance(instance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuthentication(false);
    }
  };

  const validateApp = (systems?: Array<string>): boolean => {
    if (!Array.isArray(systems)) return false;
    return systems.includes(appName);
  };

  const handleLogout = () => {
    keycloakIntance?.logout();
  };

  const handleClose = () => {
    globalThis.location.href = "https://www.google.com/";
  };

  const values = useMemo(
    () => ({
      handleLogout,
      userInfo: keycloakIntance?.tokenParsed!,
    }),
    [keycloakIntance],
  );

  const canContinue = !loadingAuthentication && keycloakIntance?.authenticated && !denyApplicationAccess;

  return (
    <Authentication.Provider value={values}>
      {canContinue ? (
        <Fragment>
          <code className="auth__codeblock">{`${options.realm} — ${options.clientId}`.toUpperCase()}</code>
          {children}
        </Fragment>
      ) : (
        <main className="auth__container">
          <h1 className="auth__title">SSO NETAPPPERU SAC</h1>

          {loadingAuthentication ? (
            <h2 className="auth__subtitle">..:: CARGANDO ::..</h2>
          ) : (
            <Fragment>
              {denyApplicationAccess ? (
                <Fragment>
                  <div>
                    <h3 className="auth__subtitle">No tienes acceso al sistema</h3>
                    <p>¡IMPORTANTE!</p>
                    <p>Usted no tiene acceso a este sistema contacte con el administrador para una mejor orientación</p>
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
                <p className="auth__subtitle">{keycloakIntance?.authenticated ? "AUTENTICADO" : "ES NECESARIO INICIAR SESIÓN"}</p>
              )}
            </Fragment>
          )}
        </main>
      )}
    </Authentication.Provider>
  );
};

export default AuthenticationProvider;
