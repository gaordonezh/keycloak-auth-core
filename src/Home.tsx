import { useAuthentication } from "./AuthenticationContext";

const Home = () => {
  const { handleLogout, userInfo } = useAuthentication();

  return (
    <div id="roots">
      <div className="spacing">
        <h3>HOLA {userInfo.name}</h3>
        <button className="counter" onClick={handleLogout}>
          CERRAR SESIÓN
        </button>
      </div>

      <code style={{ textAlign: "left" }}>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </code>
    </div>
  );
};

export default Home;
