import { useKeycloakAuthentication } from "../components/AuthenticationContext";
import { apiClient } from "./clients";

const Home = () => {
  const { keycloakUser, handleLogout, handleLogin } = useKeycloakAuthentication();

  const handleFetch = async () => {
    const test = await apiClient.get("/user");
    console.log(test.data);
  };

  return (
    <div>
      {keycloakUser ? (
        <>
          <h3>HOLA {keycloakUser.name}</h3>

          <button className="sso__button" onClick={handleLogout}>
            CERRAR SESIÓN
          </button>
          <button className="sso__button" onClick={handleFetch}>
            GET
          </button>
          <code className="sso__codeblock">
            <pre>{JSON.stringify(keycloakUser, null, 2)}</pre>
          </code>
        </>
      ) : (
        <button className="sso__button" onClick={handleLogin}>
          INICIAR SESIÓN
        </button>
      )}
    </div>
  );
};

export default Home;
