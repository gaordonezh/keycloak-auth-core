import { useAuthentication } from "../components/AuthenticationContext";
import { apiClient } from "./clients";

const Home = () => {
  const { handleLogout, userInfo } = useAuthentication();

  const handleFetch = async () => {
    const test = await apiClient.get("/user");
    console.log(test.data);
  };

  return (
    <div>
      <h3>HOLA {userInfo.name}</h3>

      <button onClick={handleLogout}>CERRAR SESIÓN</button>
      <button onClick={handleFetch}>GET</button>

      <code className="auth__codeblock">
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </code>
    </div>
  );
};

export default Home;
