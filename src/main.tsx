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
                // Токен не удалось обновить (refresh token истёк или невалиден)
                // Перенаправляем на страницу логина вместо logout (который вызывает перезагрузку)
                console.warn('Не удалось обновить токен, перенаправление на страницу входа');
                
                // Очищаем состояние пользователя
                useStoreAuth.getState().setUser(null);
                
                // Перенаправляем на страницу логина без перезагрузки
                keycloak.login().catch((loginError) => {
                    console.error('Ошибка при перенаправлении на страницу входа:', loginError);
                });
                
                // Возвращаем rejected promise без дальнейшего распространения
                return Promise.reject(new Error('Сессия истекла, требуется повторная авторизация'));
            }
        }
        return Promise.reject(error);
    }
);

keycloak
    .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        // Включаем автоматическое обновление токена за 30 секунд до истечения
        enableLogging: false,
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
            // Перенаправляем на страницу логина
            keycloak.login().catch((loginError) => {
                console.error('Ошибка при перенаправлении на страницу входа:', loginError);
            });
        }
    })
    .catch((error) => {
        console.error('Ошибка инициализации Keycloak:', error);
        // Пытаемся перенаправить на страницу логина при ошибке инициализации
        keycloak.login().catch((loginError) => {
            console.error('Ошибка при перенаправлении на страницу входа:', loginError);
        });
    });