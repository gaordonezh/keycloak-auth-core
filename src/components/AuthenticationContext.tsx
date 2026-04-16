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

      setKeycloakIntance(instance);

      const valid = validateApp(instance.tokenParsed.systems);
      if (!valid) {
        setDenyApplicationAccess(true);
        return;
      }
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

  return (
    <Authentication.Provider value={values}>
      <main>
        <h3>{`${options.realm} — ${options.clientId}`.toUpperCase()}</h3>

        {loadingAuthentication ? (
          <h3>CARGANDO...</h3>
        ) : (
          <div>
            {keycloakIntance?.authenticated ? (
              <Fragment>
                {denyApplicationAccess ? (
                  <div>
                    <h3>NO TIENES ACCESO AL SISTEMA</h3>
                    <button onClick={handleLogout}>CERRAR SESIÓN</button>
                    <button onClick={handleClose}>SALIR</button>
                  </div>
                ) : (
                  <div>
                    <code>
                      <pre>{JSON.stringify(values.userInfo, null, 2)}</pre>
                    </code>
                    <hr />
                    {children}
                  </div>
                )}
              </Fragment>
            ) : (
              <h3>ES NECESARIO INICIAR SESIÓN</h3>
            )}
          </div>
        )}
      </main>
    </Authentication.Provider>
  );
};

export default AuthenticationProvider;
