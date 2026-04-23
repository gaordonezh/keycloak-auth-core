import { useAuthentication } from "../components/AuthenticationContext";
import { apiClient } from "./clients";

const Home = () => {
  const { userInfo, handleLogout, handleLogin } = useAuthentication();

  const handleFetch = async () => {
    const test = await apiClient.get("/user");
    console.log(test.data);
  };

  return (
    <div>
      {userInfo ? (
        <>
          <h3>HOLA {userInfo.name}</h3>

          <button className="sso__button" onClick={handleLogout}>
            CERRAR SESIÓN
          </button>
          <button className="sso__button" onClick={handleFetch}>
            GET
          </button>
          <code className="sso__codeblock">
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </code>
        </>
      ) : (
        <button className="sso__button sso__mt" onClick={handleLogin}>
          INICIAR SESIÓN
        </button>
      )}
    </div>
  );
};

export default Home;
