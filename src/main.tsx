import {createRoot} from 'react-dom/client'
import './style.css'
import Index from './components/index.tsx'
import React from "react";
import keycloak from "@/auth/KeycloakService.ts";
import axios from "axios";
import {IUserData, useStoreAuth} from "@/components/MKD/stores/storeAuth.ts";

// список EP-ов для которых отключаем кэш
const arrEPUncache = [
    '/GetQcms',
    '/GetField',
    '/GetData',
]

axios.interceptors.request.use((config) => {
    if ( // отключить кэш для
        config.method?.toLowerCase() === 'get' && // GET
        arrEPUncache.some(it => config.url.includes(it))) { // для элемента из списка
        config.params = {...config.params, _t: Date.now()};
    }

    return config;
});

axios.interceptors.request.use((config) => {
    if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await keycloak.updateToken(30);
                originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
                return axios(originalRequest);
            } catch (refreshError) {
                keycloak.logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

keycloak
    .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
    }) // или 'check-sso'
    .then((authenticated: any) => {
        if (authenticated) {
            createRoot(document.getElementById('root')!).render(
                <React.StrictMode>
                    <Index/>
                </React.StrictMode>
            );

            const userData: IUserData = {
                username: keycloak.tokenParsed.preferred_username,
                name: keycloak.tokenParsed.name,
                email: keycloak.tokenParsed.email,
                roles: keycloak.tokenParsed.realm_access?.roles
            };

            useStoreAuth.getState().setUser(userData);
        } else {
            console.error('Пользователь не аутентифицирован');
        }
    })
    .catch((error) => {
        console.error('Ошибка инициализации Keycloak:', error);
    });