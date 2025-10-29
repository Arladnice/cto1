// groupsSlice.ts

import {Configuration, DataApi} from "@/api/generated";
import {startWithCapitalizeLetter, startWithCapitalizeLowerLetter} from "@/lib/strings.ts";
import {fieldMapArchive} from "@/components/MKD/MKD.components/Archive.tsx";

const configuration = new Configuration({basePath: ' '});
const apiInstance = new DataApi(configuration);

/**
 * расширить объект (list) криллическими ключами (из listDesc) с дублированными значениями из этого же объекта
 * до {name:'Петр'} после {name:'Петр', 'имя': 'Петр'}
 * @param list
 * @param listDesc
 */
const extractedObject = (list: {}, listDesc: {}) => {
    const arrKeyListHeader = Object.keys(listDesc);
    const arrNameListHeader = Object.values(listDesc);
    const len = arrNameListHeader.length;

    for (let i = 0; i < len; i++) {
        const name = arrNameListHeader[i].toString();
        const key = arrKeyListHeader[i];

        if (list[key] || list[name]) {
            if (list[key]) list?.[name] && (list[name] = list[key]);
            else list?.[key] && (list[key] = list[name]);
        }
    }

    return list;
};

export interface GroupsSlice {
    listGroups: Record<string, string[]>;
    setListGroups: (listGroups: Record<string, string[]>) => void;
    loadTableListGroups: (name: string) => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
    listGroups: {},
    setListGroups: (listGroups) =>
        set((state: any) => {
            state.listGroups = extractedObject(listGroups, get().arrHeader);
        }),
    loadTableListGroups: (name) =>
        set(async () => {
            const capName = startWithCapitalizeLetter(name);
            // @ts-ignore
            const dataApi = await apiInstance.apiDataGetFieldGet(capName, {params: {_t: Date.now()}});
            // @ts-ignore
            const {status, data: {fieldName, values}} = dataApi;
            if (status != 200) console.warn(status);

            const lowerFieldName = startWithCapitalizeLowerLetter(fieldName);
            const rusName = fieldMapArchive[lowerFieldName];

            get().setListGroups({...get().listGroups, [rusName]: values});
        }),
});
