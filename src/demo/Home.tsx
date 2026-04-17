import { useAuthentication } from "../components/AuthenticationContext";

const Home = () => {
  const { handleLogout, userInfo, accessToken } = useAuthentication();

  return (
    <div>
      <h3>HOLA {userInfo.name}</h3>
      <p>{accessToken}</p>
      <button onClick={handleLogout}>CERRAR SESIÓN</button>
    </div>
  );
};

export default Home;
