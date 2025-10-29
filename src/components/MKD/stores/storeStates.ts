import {create} from "zustand";
import {persist} from "zustand/middleware";

// Store state
export interface IStoreStates {
    state: { [key: string]: any };
    setState: (id: string, val: any) => void;
}

export const useStoreStates = create<IStoreStates>()(
    persist((set, get) => ({
        state: {},
        setState: (id, val) => set(state => ({
            state: {...state.state, [id]: val}
        }))
    }), {name: 'state', version: 0}))