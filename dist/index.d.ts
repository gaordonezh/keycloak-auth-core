import { GenericOidcConfig } from 'keycloak-js';
import { JSX } from 'react/jsx-runtime';
import { KeycloakServerConfig } from 'keycloak-js';
import { KeycloakTokenParsed } from 'keycloak-js';
import { PropsWithChildren } from 'react';

export declare interface AuthenticationContextProps {
    handleLogout: VoidFunction;
    userInfo: KeycloakTokenParsed;
}

export declare const AuthenticationProvider: (props: AuthenticationProviderProps) => JSX.Element;

export declare interface AuthenticationProviderProps extends PropsWithChildren {
    options: KeycloakOptionsConfigProps;
    appName: string;
}

export declare type KeycloakOptionsConfigProps = KeycloakServerConfig & Pick<GenericOidcConfig, "clientId">;

export declare const useAuthentication: () => AuthenticationContextProps;

export { }
