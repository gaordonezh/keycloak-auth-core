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

          <button className="auth__button" onClick={handleLogout}>
            CERRAR SESIÓN
          </button>
          <button className="auth__button" onClick={handleFetch}>
            GET
          </button>

          <code className="auth__codeblock">
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </code>
        </>
      ) : (
        <button className="auth__button" onClick={handleLogin}>
          INICIAR SESIÓN
        </button>
      )}
    </div>
  );
};

export default Home;
