import { AxiosInstance } from 'axios';
import { CreateAxiosDefaults } from 'axios';
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
    accessName: string;
}

export declare const createKeycloakAxiosInstance: (initConfig?: CreateAxiosDefaults<any>) => AxiosInstance;

export declare type KeycloakOptionsConfigProps = KeycloakServerConfig & Pick<GenericOidcConfig, "clientId">;

export declare const useAuthentication: () => AuthenticationContextProps;

export { }
