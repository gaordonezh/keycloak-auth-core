import { useAuthentication } from "../components/AuthenticationContext";

const Home = () => {
  const { handleLogout, userInfo } = useAuthentication();

  return (
    <div className="spacing">
      <h3>HOLA {userInfo.name}</h3>
      <button onClick={handleLogout}>CERRAR SESIÓN</button>
    </div>
  );
};

export default Home;
