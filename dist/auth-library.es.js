import { Fragment as e, createContext as t, useContext as n, useLayoutEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import s from "keycloak-js";
import c from "axios";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/AuthenticationContext.tsx
var d, f = async () => {
	if (!d?.token) throw Error("NEED AUTH");
	try {
		return await d.updateToken(), d.token;
	} catch (e) {
		throw d.login(), e;
	}
}, p = (e) => {
	let t = c.create(e);
	return t.interceptors.request.use(async (e) => {
		let t = await f();
		return e.headers.Authorization = `Bearer ${t}`, e;
	}), t;
}, m = t({}), h = () => n(m), g = (t) => {
	let { children: n, accessName: c, options: f } = t, [p, h] = o(!1), [g, _] = o(!1), v = a(null);
	r(() => {
		y();
	}, []);
	let y = async () => {
		try {
			h(!0);
			let e = new s(f);
			if (await e.init({
				onLoad: "login-required",
				checkLoginIframe: !0
			}), !e.authenticated || !e.tokenParsed) return;
			if (console.log(e), v.current = e.logout, !e.hasResourceRole(c)) {
				_(!0);
				return;
			}
			d = e;
		} catch (e) {
			console.log(e);
		} finally {
			h(!1);
		}
	}, b = () => {
		v.current?.();
	}, x = () => {
		globalThis.location.href = "https://www.google.com/";
	}, S = () => {
		globalThis.location.reload();
	}, C = i(() => ({
		userInfo: d?.tokenParsed,
		handleLogout: b
	}), [d]), w = !p && d?.authenticated && !g;
	return /* @__PURE__ */ l(m.Provider, {
		value: C,
		children: w ? /* @__PURE__ */ u(e, { children: [/* @__PURE__ */ l("code", {
			className: "auth__codeblock",
			children: `${f.realm} — ${f.clientId}`.toUpperCase()
		}), n] }) : /* @__PURE__ */ u("main", {
			className: "auth__container",
			children: [/* @__PURE__ */ l("h1", {
				className: "auth__title",
				children: "SSO NETAPPPERU SAC"
			}), p ? /* @__PURE__ */ u("svg", {
				width: 75,
				height: 75,
				fill: "#fff",
				viewBox: "0 0 20 20",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ u("linearGradient", {
					id: "loaderGradient",
					children: [/* @__PURE__ */ l("stop", {
						offset: "0%",
						stopColor: "currentColor",
						stopOpacity: "1"
					}), /* @__PURE__ */ l("stop", {
						offset: "100%",
						stopColor: "currentColor",
						stopOpacity: "0.25"
					})]
				}), /* @__PURE__ */ l("circle", {
					cx: "10",
					cy: "10",
					r: "8",
					id: "circle8932",
					strokeWidth: "1"
				})]
			}) : /* @__PURE__ */ l(e, { children: g ? /* @__PURE__ */ u(e, { children: [/* @__PURE__ */ u("div", { children: [
				/* @__PURE__ */ l("h3", {
					className: "auth__subtitle",
					children: "No podemos continuar..."
				}),
				/* @__PURE__ */ l("p", { children: "Usted no tiene acceso a este sistema" }),
				/* @__PURE__ */ l("p", { children: "Contacte con el administrador para una mejor orientación" })
			] }), /* @__PURE__ */ u("div", {
				className: "auth__actions",
				children: [/* @__PURE__ */ l("button", {
					className: "auth__button",
					onClick: x,
					children: "SALIR"
				}), /* @__PURE__ */ l("button", {
					className: "auth__button",
					onClick: b,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ l(e, { children: d?.authenticated ? /* @__PURE__ */ l("p", {
				className: "auth__subtitle",
				children: "AUTENTICADO"
			}) : /* @__PURE__ */ u(e, { children: [/* @__PURE__ */ l("p", { children: "Por favor, espere UN PAR DE MINUTOS y vuelva a cargar" }), /* @__PURE__ */ l("button", {
				className: "auth__button",
				onClick: S,
				children: "VOLVER A CARGAR"
			})] }) }) })]
		})
	});
};
//#endregion
export { g as AuthenticationProvider, p as createKeycloakAxiosInstance, h as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map