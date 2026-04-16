import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import Keycloak, {
  type KeycloakConfig,
  type KeycloakTokenParsed,
} from "keycloak-js";

const appName = "CONTABLE-PRINCIPAL";
const keycloakOptions: KeycloakConfig = {
  url: "http://localhost:8081",
  realm: "contable",
  clientId: "contable-client-id",
};

interface ContextProps {
  handleLogout: VoidFunction;
  userInfo: KeycloakTokenParsed;
}

const Authentication = createContext({} as ContextProps);

export const useAuthentication = () => useContext(Authentication);

const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [keycloakIntance, setKeycloakIntance] = useState<Keycloak>();
  const [loadingAuthentication, setLoadingAuthentication] = useState(false);
  const [denyApplicationAccess, setDenyApplicationAccess] = useState(false);

  useEffect(() => {
    initAndValidateKeycloak();
  }, []);

  const initAndValidateKeycloak = async () => {
    try {
      setLoadingAuthentication(true);
      const instance = new Keycloak(keycloakOptions);
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
        <h3>
          {`${keycloakOptions.realm} — ${keycloakOptions.clientId}`.toUpperCase()}
        </h3>

        {loadingAuthentication ? (
          <h3>CARGANDO...</h3>
        ) : (
          <div>
            {keycloakIntance?.authenticated ? (
              <Fragment>
                {denyApplicationAccess ? (
                  <div>
                    <h3>NO TIENES ACCESO AL SISTEMA</h3>
                    <button className="counter" onClick={handleLogout}>
                      CERRAR SESIÓN
                    </button>
                    <button className="counter" onClick={handleClose}>
                      SALIR
                    </button>
                  </div>
                ) : (
                  children
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
