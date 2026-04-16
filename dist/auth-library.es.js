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
			if (p(e), !y(e.tokenParsed.systems)) {
				_(!0);
				return;
			}
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
	}), [f]);
	return /* @__PURE__ */ s(l.Provider, {
		value: S,
		children: /* @__PURE__ */ c("main", { children: [/* @__PURE__ */ s("h3", { children: `${d.realm} — ${d.clientId}`.toUpperCase() }), m ? /* @__PURE__ */ s("h3", { children: "CARGANDO..." }) : /* @__PURE__ */ s("div", { children: f?.authenticated ? /* @__PURE__ */ s(e, { children: g ? /* @__PURE__ */ c("div", { children: [
			/* @__PURE__ */ s("h3", { children: "NO TIENES ACCESO AL SISTEMA" }),
			/* @__PURE__ */ s("button", {
				onClick: b,
				children: "CERRAR SESIÓN"
			}),
			/* @__PURE__ */ s("button", {
				onClick: x,
				children: "SALIR"
			})
		] }) : /* @__PURE__ */ c("div", { children: [
			/* @__PURE__ */ s("code", { children: /* @__PURE__ */ s("pre", { children: JSON.stringify(S.userInfo, null, 2) }) }),
			/* @__PURE__ */ s("hr", {}),
			n
		] }) }) : /* @__PURE__ */ s("h3", { children: "ES NECESARIO INICIAR SESIÓN" }) })] })
	});
};
//#endregion
export { d as AuthenticationProvider, u as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map