import { Fragment as e, createContext as t, useContext as n, useEffect as r, useLayoutEffect as i, useMemo as a, useState as o } from "react";
import s from "keycloak-js";
import c from "axios";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/KeycloakLogin.tsx
var f = ({ removeContainer: e, appname: t, expireDate: n, onLogin: i }) => {
	let [a, s] = o(!1);
	return r(() => {
		s(n >= /* @__PURE__ */ new Date());
	}, [n]), /* @__PURE__ */ d("div", {
		className: e ? "" : "sso__container",
		children: [a ? /* @__PURE__ */ d("div", {
			className: "sso__alert",
			children: [/* @__PURE__ */ u("p", {
				className: "sso__alert--icon sso__m-0",
				children: /* @__PURE__ */ u("svg", {
					focusable: "false",
					"aria-hidden": "true",
					viewBox: "0 0 24 24",
					"data-testid": "SuccessOutlinedIcon",
					height: 32,
					width: 32,
					children: /* @__PURE__ */ u("path", { d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" })
				})
			}), /* @__PURE__ */ d("p", {
				className: "sso__m-0",
				children: [
					/* @__PURE__ */ u("b", { children: "¡IMPORTANTE!" }),
					" La contraseña es la misma que el usuario solo para la primera vez que ingrese con el SSO, posteriormente este le pedirá cambiarlo.",
					n ? /* @__PURE__ */ d(l, { children: [
						" Recuerda hacerlo antes del",
						" ",
						/* @__PURE__ */ u("b", { children: (() => {
							let e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0");
							return `${String(n.getDate()).padStart(2, "0")}/${t}/${e}`;
						})() }),
						"."
					] }) : ""
				]
			})]
		}) : null, /* @__PURE__ */ d("div", {
			className: "ssoauth__container",
			children: [
				/* @__PURE__ */ u("h3", { children: t }),
				/* @__PURE__ */ u("p", { children: "Continua con el SSO NAPCONTABLE e ingrese sus credenciales para continuar..." }),
				/* @__PURE__ */ u("button", {
					className: "sso__button ssoauth__spacing sso__button--full",
					onClick: i,
					children: "SSO NAPCONTABLE"
				})
			]
		})]
	});
}, p, m = async () => {
	try {
		return p?.token ? (await p.updateToken(), p.token) : "";
	} catch (e) {
		throw console.log("ERROR GETVALIDTOKEN:", e), p?.login(), e;
	}
}, h = (e) => {
	let t = c.create(e);
	return t.interceptors.request.use(async (e) => {
		let t = await m();
		return t && (e.headers.Authorization = `Bearer ${t}`), e;
	}), t;
}, g = t({}), _ = () => n(g), v = (t) => {
	let { children: n, accessName: r, options: c, omitGlobalAuth: l, checkLoginIframe: m } = t, [h, _] = o(!0), [v, y] = o(!1);
	i(() => {
		b();
	}, []);
	let b = async () => {
		try {
			_(!0);
			let e = new s(c);
			if (await e.init({
				onLoad: l ? "check-sso" : "login-required",
				checkLoginIframe: m
			}), p = e, !e.authenticated || !e.tokenParsed) return;
			e.hasResourceRole(r) || y(!0);
		} catch (e) {
			console.log(e);
		} finally {
			_(!1);
		}
	}, x = () => {
		p?.logout();
	}, S = () => {
		globalThis.location.href = "https://www.google.com/";
	}, C = () => {
		p?.login();
	}, w = a(() => ({
		loadingAuthentication: h,
		keycloakUser: p?.tokenParsed,
		handleLogout: x,
		handleLogin: C
	}), [p, h]), T = !v && !h, E = p?.authenticated && T, D = l && T;
	return /* @__PURE__ */ u(g.Provider, {
		value: w,
		children: E || D ? n : /* @__PURE__ */ d("main", {
			className: "sso__container",
			children: [/* @__PURE__ */ u("h1", {
				className: "sso__title",
				children: "SSO NETAPPPERU SAC"
			}), h ? /* @__PURE__ */ d("svg", {
				width: 75,
				height: 75,
				fill: "#fff",
				viewBox: "0 0 20 20",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ d("linearGradient", {
					id: "loaderGradient",
					children: [/* @__PURE__ */ u("stop", {
						offset: "0%",
						stopColor: "currentColor",
						stopOpacity: "1"
					}), /* @__PURE__ */ u("stop", {
						offset: "100%",
						stopColor: "currentColor",
						stopOpacity: "0.25"
					})]
				}), /* @__PURE__ */ u("circle", {
					cx: "10",
					cy: "10",
					r: "8",
					id: "sso__circle__loader",
					strokeWidth: "1"
				})]
			}) : /* @__PURE__ */ u(e, { children: v ? /* @__PURE__ */ d(e, { children: [/* @__PURE__ */ d("div", { children: [
				/* @__PURE__ */ u("h3", {
					className: "sso__subtitle",
					children: "No podemos continuar..."
				}),
				/* @__PURE__ */ u("p", {
					className: "sso__m-0",
					children: "Usted no tiene acceso a este sistema"
				}),
				/* @__PURE__ */ u("p", {
					className: "sso__m-0",
					children: "Contacte con el administrador para una mejor orientación"
				})
			] }), /* @__PURE__ */ d("div", {
				className: "sso__actions sso__mt",
				children: [/* @__PURE__ */ u("button", {
					className: "sso__button",
					onClick: S,
					children: "SALIR"
				}), /* @__PURE__ */ u("button", {
					className: "sso__button",
					onClick: x,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ u(e, { children: p?.authenticated ? /* @__PURE__ */ u("p", {
				className: "sso__subtitle",
				children: "AUTENTICADO"
			}) : /* @__PURE__ */ u(f, {
				removeContainer: !0,
				expireDate: new Date(2026, 3, 30, 23, 59, 59),
				appname: "TEST APP",
				onLogin: C
			}) }) })]
		})
	});
};
//#endregion
export { v as KeycloakAuthenticationProvider, f as KeycloakLogin, h as createKeycloakAxiosInstance, _ as useKeycloakAuthentication };

//# sourceMappingURL=auth-library.es.js.map