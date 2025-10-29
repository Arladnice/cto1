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
    user: IUserData;
    setUser: (user: IUserData) => void;
    clearUser: () => void;
}

export const useStoreAuth = create<IStoreAuth>()(
    persist((set, get) => ({
        user: null,
        isAuthenticated: false,

        setUser: (userAuth: IUserData) => {
            set((s: IStoreAuth) => {
                return {...s, user: userAuth};
            });
        },
        clearUser: () => set(() => {
            keycloak.logout({redirectUri: window.location.origin});
            return {user: null};
        }),
    }), {name: 'state', version: 0}))