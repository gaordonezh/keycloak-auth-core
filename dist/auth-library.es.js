import { Fragment as e, createContext as t, useContext as n, useLayoutEffect as r, useMemo as i, useState as a } from "react";
import o from "keycloak-js";
import s from "axios";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/AuthenticationContext.tsx
var u, d = async () => {
	try {
		return u?.token ? (await u.updateToken(), u.token) : "";
	} catch (e) {
		throw console.log("ERROR GETVALIDTOKEN:", e), u?.login(), e;
	}
}, f = (e) => {
	let t = s.create(e);
	return t.interceptors.request.use(async (e) => {
		let t = await d();
		return t && (e.headers.Authorization = `Bearer ${t}`), e;
	}), t;
}, p = t({}), m = () => n(p), h = (t) => {
	let { children: n, accessName: s, options: d, omitGlobalAuth: f } = t, [m, h] = a(!1), [g, _] = a(!1);
	r(() => {
		v();
	}, []);
	let v = async () => {
		try {
			h(!0);
			let e = new o(d);
			if (await e.init({
				onLoad: "check-sso",
				checkLoginIframe: !0
			}), u = e, !e.authenticated || !e.tokenParsed) return;
			if (!e.hasResourceRole(s)) {
				_(!0);
				return;
			}
		} catch (e) {
			console.log(e);
		} finally {
			h(!1);
		}
	}, y = () => {
		u?.logout();
	}, b = () => {
		globalThis.location.href = "https://www.google.com/";
	}, x = () => {
		globalThis.location.reload();
	}, S = () => {
		u?.login();
	}, C = i(() => ({
		userInfo: u?.tokenParsed,
		handleLogout: y,
		handleLogin: S
	}), [u]), w = !m && u?.authenticated && !g;
	return /* @__PURE__ */ c(p.Provider, {
		value: C,
		children: w || f ? /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ c("code", {
			className: "auth__codeblock",
			children: `${d.realm} — ${d.clientId}`.toUpperCase()
		}), n] }) : /* @__PURE__ */ l("main", {
			className: "auth__container",
			children: [/* @__PURE__ */ c("h1", {
				className: "auth__title",
				children: "SSO NETAPPPERU SAC"
			}), m ? /* @__PURE__ */ l("svg", {
				width: 75,
				height: 75,
				fill: "#fff",
				viewBox: "0 0 20 20",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ l("linearGradient", {
					id: "loaderGradient",
					children: [/* @__PURE__ */ c("stop", {
						offset: "0%",
						stopColor: "currentColor",
						stopOpacity: "1"
					}), /* @__PURE__ */ c("stop", {
						offset: "100%",
						stopColor: "currentColor",
						stopOpacity: "0.25"
					})]
				}), /* @__PURE__ */ c("circle", {
					cx: "10",
					cy: "10",
					r: "8",
					id: "circle8932",
					strokeWidth: "1"
				})]
			}) : /* @__PURE__ */ c(e, { children: g ? /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ l("div", { children: [
				/* @__PURE__ */ c("h3", {
					className: "auth__subtitle",
					children: "No podemos continuar..."
				}),
				/* @__PURE__ */ c("p", { children: "Usted no tiene acceso a este sistema" }),
				/* @__PURE__ */ c("p", { children: "Contacte con el administrador para una mejor orientación" })
			] }), /* @__PURE__ */ l("div", {
				className: "auth__actions",
				children: [/* @__PURE__ */ c("button", {
					className: "auth__button",
					onClick: b,
					children: "SALIR"
				}), /* @__PURE__ */ c("button", {
					className: "auth__button",
					onClick: y,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ c(e, { children: u?.authenticated ? /* @__PURE__ */ c("p", {
				className: "auth__subtitle",
				children: "AUTENTICADO"
			}) : /* @__PURE__ */ l(e, { children: [
				/* @__PURE__ */ c("p", { children: "Por favor, espere UN PAR DE MINUTOS y vuelva a cargar" }),
				/* @__PURE__ */ c("button", {
					className: "auth__button",
					onClick: x,
					children: "VOLVER A CARGAR"
				}),
				/* @__PURE__ */ c("button", {
					className: "auth__button",
					onClick: S,
					children: "INICIAR SESIÓN"
				})
			] }) }) })]
		})
	});
};
//#endregion
export { h as AuthenticationProvider, f as createKeycloakAxiosInstance, m as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map