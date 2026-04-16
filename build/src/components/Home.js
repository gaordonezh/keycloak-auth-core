import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useAuthentication } from "./AuthenticationContext";
const Home = () => {
    const { handleLogout, userInfo } = useAuthentication();
    return (_jsxs("div", { className: "spacing", children: [_jsxs("h3", { children: ["HOLA ", userInfo.name] }), _jsx("button", { onClick: handleLogout, children: "CERRAR SESI\u00D3N" })] }));
};
export default Home;
