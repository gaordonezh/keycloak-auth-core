import { AxiosInstance } from 'axios';
import { CreateAxiosDefaults } from 'axios';
import { GenericOidcConfig } from 'keycloak-js';
import { JSX } from 'react/jsx-runtime';
import { KeycloakServerConfig } from 'keycloak-js';
import { KeycloakTokenParsed } from 'keycloak-js';
import { PropsWithChildren } from 'react';

export declare const createKeycloakAxiosInstance: (initConfig?: CreateAxiosDefaults<any>) => AxiosInstance;

export declare interface KeycloakAuthenticationContextProps {
    loadingAuthentication: boolean;
    keycloakUser: KeycloakTokenParsed;
    handleLogout: VoidFunction;
    handleLogin: VoidFunction;
}

export declare const KeycloakAuthenticationProvider: (props: KeycloakAuthenticationProviderProps) => JSX.Element;

export declare interface KeycloakAuthenticationProviderProps extends PropsWithChildren {
    options: KeycloakOptionsConfigProps;
    accessName: string;
    omitGlobalAuth: boolean;
    checkLoginIframe: boolean;
}

export declare type KeycloakOptionsConfigProps = KeycloakServerConfig & Pick<GenericOidcConfig, "clientId">;

export declare const useKeycloakAuthentication: () => KeycloakAuthenticationContextProps;

export { }
