import { Fragment as e, createContext as t, useContext as n, useEffect as r, useMemo as i, useState as a } from "react";
import o from "keycloak-js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/AuthenticationContext.tsx
var l = t({}), u = () => n(l), d = ({ children: t, appName: n, options: u }) => {
	let [d, f] = a(), [p, m] = a(!1), [h, g] = a(!1);
	r(() => {
		_();
	}, []);
	let _ = async () => {
		try {
			m(!0);
			let e = new o(u);
			if (await e.init({ onLoad: "login-required" }), !e.authenticated || !e.tokenParsed) return;
			if (f(e), !v(e.tokenParsed.systems)) {
				g(!0);
				return;
			}
		} catch (e) {
			console.log(e);
		} finally {
			m(!1);
		}
	}, v = (e) => Array.isArray(e) ? e.includes(n) : !1, y = () => {
		d?.logout();
	}, b = () => {
		globalThis.location.href = "https://www.google.com/";
	}, x = i(() => ({
		handleLogout: y,
		userInfo: d?.tokenParsed
	}), [d]);
	return /* @__PURE__ */ s(l.Provider, {
		value: x,
		children: /* @__PURE__ */ c("main", { children: [/* @__PURE__ */ s("h3", { children: `${u.realm} — ${u.clientId}`.toUpperCase() }), p ? /* @__PURE__ */ s("h3", { children: "CARGANDO..." }) : /* @__PURE__ */ s("div", { children: d?.authenticated ? /* @__PURE__ */ s(e, { children: h ? /* @__PURE__ */ c("div", { children: [
			/* @__PURE__ */ s("h3", { children: "NO TIENES ACCESO AL SISTEMA" }),
			/* @__PURE__ */ s("button", {
				onClick: y,
				children: "CERRAR SESIÓN"
			}),
			/* @__PURE__ */ s("button", {
				onClick: b,
				children: "SALIR"
			})
		] }) : /* @__PURE__ */ c("div", { children: [
			/* @__PURE__ */ s("code", { children: /* @__PURE__ */ s("pre", { children: JSON.stringify(x.userInfo, null, 2) }) }),
			/* @__PURE__ */ s("hr", {}),
			t
		] }) }) : /* @__PURE__ */ s("h3", { children: "ES NECESARIO INICIAR SESIÓN" }) })] })
	});
};
//#endregion
export { d as AuthenticationProvider, u as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map