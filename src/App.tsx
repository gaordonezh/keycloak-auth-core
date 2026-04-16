import Home from "./Home";
import AuthenticationProvider from "./AuthenticationContext";

const App = () => (
  <AuthenticationProvider>
    <Home />
  </AuthenticationProvider>
);

export default App;
