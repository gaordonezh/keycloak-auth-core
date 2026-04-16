import { Fragment as e, createContext as t, useContext as n, useEffect as r, useMemo as i, useState as a } from "react";
import o from "keycloak-js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/AuthenticationContext.tsx
var l = t({}), u = () => n(l), d = (t) => {
	let { children: n, appName: u, options: d } = t, [f, p] = a(), [m, h] = a(!1), [g, _] = a(!1);
	r(() => {
		v();
	}, []);
	let v = async () => {
		try {
			h(!0);
			let e = new o(d);
			if (await e.init({ onLoad: "login-required" }), !e.authenticated || !e.tokenParsed) return;
			if (!y(e.tokenParsed.systems)) {
				_(!0);
				return;
			}
			p(e);
		} catch (e) {
			console.log(e);
		} finally {
			h(!1);
		}
	}, y = (e) => Array.isArray(e) ? e.includes(u) : !1, b = () => {
		f?.logout();
	}, x = () => {
		globalThis.location.href = "https://www.google.com/";
	}, S = i(() => ({
		handleLogout: b,
		userInfo: f?.tokenParsed
	}), [f]), C = !m && f?.authenticated && !g;
	return /* @__PURE__ */ s(l.Provider, {
		value: S,
		children: C ? /* @__PURE__ */ c(e, { children: [/* @__PURE__ */ s("code", {
			className: "auth__codeblock",
			children: `${d.realm} — ${d.clientId}`.toUpperCase()
		}), n] }) : /* @__PURE__ */ c("main", {
			className: "auth__container",
			children: [/* @__PURE__ */ s("h1", {
				className: "auth__title",
				children: "SSO NETAPPPERU SAC"
			}), m ? /* @__PURE__ */ s("h2", {
				className: "auth__subtitle",
				children: "..:: CARGANDO ::.."
			}) : /* @__PURE__ */ s(e, { children: g ? /* @__PURE__ */ c(e, { children: [/* @__PURE__ */ c("div", { children: [
				/* @__PURE__ */ s("h3", {
					className: "auth__subtitle",
					children: "No tienes acceso al sistema"
				}),
				/* @__PURE__ */ s("p", { children: "¡IMPORTANTE!" }),
				/* @__PURE__ */ s("p", { children: "Usted no tiene acceso a este sistema contacte con el administrador para una mejor orientación" })
			] }), /* @__PURE__ */ c("div", {
				className: "auth__actions",
				children: [/* @__PURE__ */ s("button", {
					className: "auth__button",
					onClick: x,
					children: "SALIR"
				}), /* @__PURE__ */ s("button", {
					className: "auth__button",
					onClick: b,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ s("p", {
				className: "auth__subtitle",
				children: f?.authenticated ? "AUTENTICADO" : "ES NECESARIO INICIAR SESIÓN"
			}) })]
		})
	});
};
//#endregion
export { d as AuthenticationProvider, u as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map