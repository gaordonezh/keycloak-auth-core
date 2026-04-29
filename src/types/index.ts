import type { PropsWithChildren } from "react";
import type { KeycloakResourceAccess, KeycloakRoles } from "keycloak-js";

export interface KeycloakSSOUserProps {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string;
  azp?: string;
  session_state?: string;
  realm_access?: KeycloakRoles;
  resource_access?: KeycloakResourceAccess;
  [key: string]: any;
}

export interface KeycloakAuthenticationContextProps {
  loadingAuthentication: boolean;
  keycloakUser: KeycloakSSOUserProps;
  handleLogout: VoidFunction;
  handleLogin: VoidFunction;
}

export type KeycloakOptionsConfigProps = {
  /**
   * URL to the Keycloak server, for example: http://keycloak-server/auth
   */
  url: string;
  /**
   * Name of the realm, for example: 'myrealm'
   */
  realm: string;
  /**
   * Client identifier, example: 'myapp-clientid'
   */
  clientId: string;
};

export interface KeycloakAuthenticationProviderProps extends PropsWithChildren {
  options: KeycloakOptionsConfigProps;
  accessName: string;
  omitGlobalAuth: boolean;
  checkLoginIframe: boolean;
}

export interface KeycloakLoginProps {
  expireDate: Date;
  appname: string;
  onLogin: VoidFunction;
  removeContainer?: boolean;
}
