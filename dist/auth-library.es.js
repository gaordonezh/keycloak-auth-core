import { Fragment as e, createContext as t, useContext as n, useLayoutEffect as r, useMemo as i, useState as a } from "react";
import o from "keycloak-js";
import s from "axios";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/KeycloakLogin.tsx
var u = ({ removeContainer: e, appname: t, onLogin: n }) => /* @__PURE__ */ l("div", {
	className: e ? "" : "sso__container",
	children: [/* @__PURE__ */ l("div", {
		className: "sso__alert",
		children: [/* @__PURE__ */ c("p", {
			className: "sso__alert--icon sso__m-0",
			children: /* @__PURE__ */ c("svg", {
				focusable: "false",
				"aria-hidden": "true",
				viewBox: "0 0 24 24",
				"data-testid": "SuccessOutlinedIcon",
				height: 32,
				width: 32,
				children: /* @__PURE__ */ c("path", { d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" })
			})
		}), /* @__PURE__ */ l("p", {
			className: "sso__m-0",
			children: [/* @__PURE__ */ c("b", { children: "¡IMPORTANTE!" }), " La contraseña es la misma que el usuario solo para la primera vez que ingrese con el SSO, posteriormente este te pedirá cambiarlo."]
		})]
	}), /* @__PURE__ */ l("div", {
		className: "ssoauth__container",
		children: [
			/* @__PURE__ */ c("h3", { children: t }),
			/* @__PURE__ */ c("p", { children: "Continua con el SSO NAPCONTABLE e ingrese sus credenciales para continuar..." }),
			/* @__PURE__ */ c("button", {
				className: "sso__button ssoauth__spacing sso__button--full",
				onClick: n,
				children: "SSO NAPCONTABLE"
			})
		]
	})]
}), d, f = async () => {
	try {
		return d?.token ? (await d.updateToken(), d.token) : "";
	} catch (e) {
		throw console.log("ERROR GETVALIDTOKEN:", e), d?.login(), e;
	}
}, p = (e) => {
	let t = s.create(e);
	return t.interceptors.request.use(async (e) => {
		let t = await f();
		return t && (e.headers.Authorization = `Bearer ${t}`), e;
	}), t;
}, m = t({}), h = () => n(m), g = (t) => {
	let { children: n, accessName: s, options: f, omitGlobalAuth: p, checkLoginIframe: h } = t, [g, _] = a(!0), [v, y] = a(!1);
	r(() => {
		b();
	}, []);
	let b = async () => {
		try {
			_(!0);
			let e = new o(f);
			if (await e.init({
				onLoad: p ? "check-sso" : "login-required",
				checkLoginIframe: h
			}), d = e, !e.authenticated || !e.tokenParsed) return;
			e.hasResourceRole(s) || y(!0);
		} catch (e) {
			console.log(e);
		} finally {
			_(!1);
		}
	}, x = () => {
		d?.logout();
	}, S = () => {
		globalThis.location.href = "https://www.google.com/";
	}, C = () => {
		d?.login();
	}, w = i(() => ({
		loadingAuthentication: g,
		keycloakUser: d?.tokenParsed,
		handleLogout: x,
		handleLogin: C
	}), [d, g]), T = !v && !g, E = d?.authenticated && T, D = p && T;
	return /* @__PURE__ */ c(m.Provider, {
		value: w,
		children: E || D ? n : /* @__PURE__ */ l("main", {
			className: "sso__container",
			children: [/* @__PURE__ */ c("h1", {
				className: "sso__title",
				children: "SSO NETAPPPERU SAC"
			}), g ? /* @__PURE__ */ l("svg", {
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
			}) : /* @__PURE__ */ c(e, { children: v ? /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ l("div", { children: [
				/* @__PURE__ */ c("h3", {
					className: "sso__subtitle",
					children: "No podemos continuar..."
				}),
				/* @__PURE__ */ c("p", {
					className: "sso__m-0",
					children: "Usted no tiene acceso a este sistema"
				}),
				/* @__PURE__ */ c("p", {
					className: "sso__m-0",
					children: "Contacte con el administrador para una mejor orientación"
				})
			] }), /* @__PURE__ */ l("div", {
				className: "sso__actions sso__mt",
				children: [/* @__PURE__ */ c("button", {
					className: "sso__button",
					onClick: S,
					children: "SALIR"
				}), /* @__PURE__ */ c("button", {
					className: "sso__button",
					onClick: x,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ c(e, { children: d?.authenticated ? /* @__PURE__ */ c("p", {
				className: "sso__subtitle",
				children: "AUTENTICADO"
			}) : /* @__PURE__ */ c(u, {
				removeContainer: !0,
				appname: "SOMEONE APP",
				onLogin: () => console.log("app")
			}) }) })]
		})
	});
};
//#endregion
export { g as KeycloakAuthenticationProvider, u as KeycloakLogin, p as createKeycloakAxiosInstance, h as useKeycloakAuthentication };

//# sourceMappingURL=auth-library.es.js.map