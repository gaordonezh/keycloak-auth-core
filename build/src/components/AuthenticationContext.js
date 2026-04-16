import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, Fragment, useContext, useEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";
const Authentication = createContext({});
export const useAuthentication = () => useContext(Authentication);
const AuthenticationProvider = ({ children, appName, options }) => {
    const [keycloakIntance, setKeycloakIntance] = useState();
    const [loadingAuthentication, setLoadingAuthentication] = useState(false);
    const [denyApplicationAccess, setDenyApplicationAccess] = useState(false);
    useEffect(() => {
        initAndValidateKeycloak();
    }, []);
    const initAndValidateKeycloak = async () => {
        try {
            setLoadingAuthentication(true);
            const instance = new Keycloak(options);
            await instance.init({ onLoad: "login-required" });
            if (!instance.authenticated || !instance.tokenParsed)
                return;
            setKeycloakIntance(instance);
            const valid = validateApp(instance.tokenParsed.systems);
            if (!valid) {
                setDenyApplicationAccess(true);
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoadingAuthentication(false);
        }
    };
    const validateApp = (systems) => {
        if (!Array.isArray(systems))
            return false;
        return systems.includes(appName);
    };
    const handleLogout = () => {
        keycloakIntance?.logout();
    };
    const handleClose = () => {
        globalThis.location.href = "https://www.google.com/";
    };
    const values = useMemo(() => ({
        handleLogout,
        userInfo: keycloakIntance?.tokenParsed,
    }), [keycloakIntance]);
    return (_jsx(Authentication.Provider, { value: values, children: _jsxs("main", { children: [_jsx("h3", { children: `${options.realm} — ${options.clientId}`.toUpperCase() }), loadingAuthentication ? (_jsx("h3", { children: "CARGANDO..." })) : (_jsx("div", { children: keycloakIntance?.authenticated ? (_jsx(Fragment, { children: denyApplicationAccess ? (_jsxs("div", { children: [_jsx("h3", { children: "NO TIENES ACCESO AL SISTEMA" }), _jsx("button", { onClick: handleLogout, children: "CERRAR SESI\u00D3N" }), _jsx("button", { onClick: handleClose, children: "SALIR" })] })) : (_jsxs("div", { children: [_jsx("code", { children: _jsx("pre", { children: JSON.stringify(values.userInfo, null, 2) }) }), _jsx("hr", {}), children] })) })) : (_jsx("h3", { children: "ES NECESARIO INICIAR SESI\u00D3N" })) }))] }) }));
};
export default AuthenticationProvider;
