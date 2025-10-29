import React, {useEffect} from 'react'
import './style.css'
import {eventBus} from "../lib/events.ts";
import MKD from "@/components/MKD/MKD.tsx";
import keycloak from "@/auth/KeycloakService.ts";

function Index() {

    useEffect(() => {

        const socketHandler = ({type, data}) => {
            // события с бэка
            console.log(type, data);
        };

        const localHandler = (({type, data}) => {
            // локальные события
            console.log(type, data);
        });

        eventBus.addEventListener('message-socket', socketHandler);
        eventBus.addEventListener('message-local', localHandler)

        return () => {
            eventBus.removeEventListener('message-socket', socketHandler);
            eventBus.removeEventListener('message-local', localHandler);
        }
    }, [])

    // const token = keycloak.token; // JWT токен
    // const userInfo = keycloak.idTokenParsed; // данные пользователя
    //
    // console.log(token, userInfo);

    return (
        <div className="flex flex-col h-full">
            <MKD/>
        </div>
    )
}

export default Index
