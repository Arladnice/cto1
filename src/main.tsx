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
            
            // Проверяем, что refresh token ещё валиден
            if (!keycloak.refreshToken || keycloak.isTokenExpired(5)) {
                // Refresh token истёк или отсутствует - необходима повторная авторизация
                console.warn('Refresh token истёк, требуется повторная авторизация');
                
                // Очищаем состояние пользователя
                useStoreAuth.getState().setUser(null);
                
                // Очищаем токены в keycloak
                keycloak.clearToken();
                
                // Перенаправляем на страницу логина
                window.location.href = keycloak.createLoginUrl({
                    redirectUri: window.location.origin + window.location.pathname
                });
                
                return Promise.reject(new Error('Сессия истекла, требуется повторная авторизация'));
            }
            
            try {
                // Пытаемся обновить токен
                const refreshed = await keycloak.updateToken(30);
                
                if (refreshed && keycloak.token) {
                    // Токен успешно обновлён
                    originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
                    return axios(originalRequest);
                } else {
                    // Обновление не произошло или токен отсутствует
                    throw new Error('Токен не был обновлён');
                }
            } catch (refreshError) {
                // Токен не удалось обновить (refresh token истёк или невалиден)
                console.warn('Не удалось обновить токен, перенаправление на страницу входа');
                
                // Очищаем состояние пользователя
                useStoreAuth.getState().setUser(null);
                
                // Очищаем токены в keycloak
                keycloak.clearToken();
                
                // Перенаправляем на страницу логина через изменение URL (без перезагрузки через logout)
                window.location.href = keycloak.createLoginUrl({
                    redirectUri: window.location.origin + window.location.pathname
                });
                
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
        enableLogging: false,
    })
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
            
            // Настраиваем автоматическое обновление токена
            // Обновляем токен каждые 30 секунд, если до истечения осталось меньше 60 секунд
            setInterval(() => {
                keycloak.updateToken(60).then((refreshed) => {
                    if (refreshed) {
                        console.log('Токен был обновлён автоматически');
                    }
                }).catch(() => {
                    console.error('Не удалось обновить токен автоматически, сессия истекла');
                    // Очищаем состояние
                    useStoreAuth.getState().setUser(null);
                    keycloak.clearToken();
                    // Перенаправляем на логин
                    window.location.href = keycloak.createLoginUrl({
                        redirectUri: window.location.origin + window.location.pathname
                    });
                });
            }, 30000); // проверяем каждые 30 секунд
        } else {
            console.error('Пользователь не аутентифицирован');
            // Перенаправляем на страницу логина
            window.location.href = keycloak.createLoginUrl({
                redirectUri: window.location.origin + window.location.pathname
            });
        }
    })
    .catch((error) => {
        console.error('Ошибка инициализации Keycloak:', error);
        // Пытаемся перенаправить на страницу логина при ошибке инициализации
        window.location.href = keycloak.createLoginUrl({
            redirectUri: window.location.origin + window.location.pathname
        });
    });