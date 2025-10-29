import {create} from "zustand";
import {persist} from "zustand/middleware";
import keycloak from "@/auth/KeycloakService.ts";
import {StoreArchive} from "@/components/MKD/stores/stores.ts";


export interface IUserData {
    username: string;
    name: string;
    email: string;
    roles: string[];
}

// Store state
export interface IStoreAuth {
    user: IUserData | null;
    setUser: (user: IUserData | null) => void;
    clearUser: () => void;
}

export const useStoreAuth = create<IStoreAuth>()(
    persist((set, get) => ({
        user: null,
        isAuthenticated: false,

        setUser: (userAuth: IUserData | null) => {
            set((s: IStoreAuth) => {
                return {...s, user: userAuth};
            });
        },
        clearUser: () => {
            // Очищаем состояние пользователя
            set(() => ({user: null}));
            // Перенаправляем на страницу логина без перезагрузки через logout
            keycloak.login().catch((error) => {
                console.error('Ошибка при перенаправлении на страницу входа:', error);
            });
        },
    }), {name: 'state', version: 0}))