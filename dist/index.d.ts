import { AxiosInstance } from 'axios';
import { CreateAxiosDefaults } from 'axios';
import { JSX } from 'react/jsx-runtime';
import { KeycloakResourceAccess } from 'keycloak-js';
import { KeycloakRoles } from 'keycloak-js';
import { PropsWithChildren } from 'react';

export declare const createKeycloakAxiosInstance: (initConfig?: CreateAxiosDefaults<any>) => AxiosInstance;

export declare interface KeycloakAuthenticationContextProps {
    loadingAuthentication: boolean;
    keycloakUser: KeycloakSSOUserProps;
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

export declare const KeycloakLogin: ({ removeContainer, appname, expireDate, onLogin }: KeycloakLoginProps) => JSX.Element;

export declare interface KeycloakLoginProps {
    expireDate: Date;
    appname: string;
    onLogin: VoidFunction;
    removeContainer?: boolean;
}

export declare type KeycloakOptionsConfigProps = {
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

export declare interface KeycloakSSOUserProps {
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

export declare const useKeycloakAuthentication: () => KeycloakAuthenticationContextProps;

export { }
