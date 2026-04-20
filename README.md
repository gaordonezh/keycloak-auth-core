# React + TypeScript + Vite

Este proyecto se usa como _Libreria de autenticación con Keycloak para React_

## Forma de uso

Colocar el nombre y la libreria apuntando al repositorio y al tag que se quiere consumir

```js
"dependencies": {
  "keycloak-auth-core": "github:gaordonezh/keycloak-auth-core#v1.1.0"
},
```

Expone:

- AuthenticationProvider: Contexto global para inicializar la config.
- createKeycloakAxiosInstance: Función para crear una instancia de axios con la el token y refresh token incrustado.
- useAuthentication: Donde se almacena la info del usuario, login y logout.
- Estilos globales del autorizador
