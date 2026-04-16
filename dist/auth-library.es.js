import { Fragment as e, createContext as t, useContext as n, useEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import s from "keycloak-js";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/AuthenticationContext.tsx
var u = t({}), d = () => n(u), f = (t) => {
	let { children: n, appName: d, options: f } = t, [p, m] = o(), [h, g] = o(!1), [_, v] = o(!1), y = a(null);
	r(() => {
		b();
	}, []);
	let b = async () => {
		try {
			g(!0);
			let e = new s(f);
			if (await e.init({ onLoad: "login-required" }), !e.authenticated || !e.tokenParsed) return;
			if (y.current = e.logout, !x(e.tokenParsed.systems)) {
				v(!0);
				return;
			}
			m(e);
		} catch (e) {
			console.log(e);
		} finally {
			g(!1);
		}
	}, x = (e) => Array.isArray(e) ? e.includes(d) : !1, S = () => {
		y.current?.();
	}, C = () => {
		globalThis.location.href = "https://www.google.com/";
	}, w = () => {
		globalThis.location.reload();
	}, T = i(() => ({
		handleLogout: S,
		userInfo: p?.tokenParsed
	}), [p]), E = !h && p?.authenticated && !_;
	return /* @__PURE__ */ c(u.Provider, {
		value: T,
		children: E ? /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ c("code", {
			className: "auth__codeblock",
			children: `${f.realm} — ${f.clientId}`.toUpperCase()
		}), n] }) : /* @__PURE__ */ l("main", {
			className: "auth__container",
			children: [/* @__PURE__ */ c("h1", {
				className: "auth__title",
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
					id: "circle8932",
					strokeWidth: "1"
				})]
			}) : /* @__PURE__ */ c(e, { children: _ ? /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ l("div", { children: [
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
					onClick: C,
					children: "SALIR"
				}), /* @__PURE__ */ c("button", {
					className: "auth__button",
					onClick: S,
					children: "CERRAR SESIÓN"
				})]
			})] }) : /* @__PURE__ */ c(e, { children: p?.authenticated ? /* @__PURE__ */ c("p", {
				className: "auth__subtitle",
				children: "AUTENTICADO"
			}) : /* @__PURE__ */ l(e, { children: [/* @__PURE__ */ c("p", { children: "Por favor, espere UN PAR DE MINUTOS y vuelva a cargar" }), /* @__PURE__ */ c("button", {
				className: "auth__button",
				onClick: w,
				children: "VOLVER A CARGAR"
			})] }) }) })]
		})
	});
};
//#endregion
export { f as AuthenticationProvider, d as useAuthentication };

//# sourceMappingURL=auth-library.es.js.map