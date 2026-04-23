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
	let { children: n, accessName: s, options: d, omitGlobalAuth: f, checkLoginIframe: m } = t, [h, g] = a(!1), [_, v] = a(!1);
	r(() => {
		y();
	}, []);
	let y = async () => {
		try {
			g(!0);
			let e = new o(d);
			if (await e.init({
				onLoad: f ? "check-sso" : "login-required",
				checkLoginIframe: m
			}), u = e, !e.authenticated || !e.tokenParsed) return;
			if (!e.hasResourceRole(s)) {
				v(!0);
				return;
			}
		} catch (e) {
			console.log(e);
		} finally {
			g(!1);
		}
	}, b = () => {
		u?.logout();
	}, x = () => {
		globalThis.location.href = "https://www.google.com/";
	}, S = () => {
		globalThis.location.reload();
	}, C = () => {
		u?.login();
	}, w = i(() => ({
		userInfo: u?.tokenParsed,
		handleLogout: b,
		handleLogin: C
	}), [u]), T = !h && u?.authenticated && !_;
	return /* @__PURE__ */ c(p.Provider, {
		value: w,
		children: T || f ? n : /* @__PURE__ */ l("main", {
			className: "sso__container",
			children: [/* @__PURE__ */ c("h1", {
				className: "sso__title",
				children: "SSO NETAPPPERU SAC"
			}), h ? /* @__PURE__ */ l("svg", {
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
					id: "sso__circle__loader",
					strokeWidth: "1"
				})]
			}) : /* @__PURE__ */ c(e, { children: _ ? /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ l("div", { children: [
				/* @__PURE__ */ c("h3", {
					className: "sso__subtitle",
					children: "No podemos continuar..."
				}),
				/* @__PURE__ */ c("p", { children: "Usted no tiene acceso a este sistema" }),
				/* @__PURE__ */ c("p", { children: "Contacte con el administrador para una mejor orientación" })
			] }), /* @__PURE__ */ l("div", {
				className: "sso__actions sso__mt",
				children: [/* @__PURE__ */ c("button", {
					className: "sso__button",
					onClick: x,
					children: "SALIR"
				}), /* @__PURE__ */ c("button", {
					className: "sso__button",
					onClick: b,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ c(e, { children: u?.authenticated ? /* @__PURE__ */ c("p", {
				className: "sso__subtitle",
				children: "AUTENTICADO"
			}) : /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ l("p", { children: [
				"Por favor, espere un ",
				/* @__PURE__ */ c("b", { children: "par de minutos" }),
				" y vuelva a intentarlo."
			] }), /* @__PURE__ */ l("div", {
				className: "sso__actions sso__mt",
				children: [/* @__PURE__ */ c("button", {
					className: "sso__button",
					onClick: S,
					children: "VOLVER A CARGAR"
				}), /* @__PURE__ */ c("button", {
					className: "sso__button",
					onClick: C,
					children: "INICIAR SESIÓN"
				})]
			})] }) }) })]
		})
	});
};
//#endregion
export { h as AuthenticationProvider, f as createKeycloakAxiosInstance, m as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map