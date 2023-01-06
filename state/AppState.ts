import React from 'react';
import {UserAuthentication} from './UserAuthentication'


interface CreateContextResult<T> {
    AppContext: React.Context<T>,
    useContext: () => T
}

export const createContext = <T>(label: string): CreateContextResult<T> => {
    const marker = {};

    //@ts-expect-error
    const AppContext = React.createContext<T>(marker);

    const useContext = (): T => {
        const context = React.useContext(AppContext);

        if (context === marker) {
            throw Error(`value was read out of context => "${label}"`);
        }

        return context;
    };

    return {
        AppContext,
        useContext
    };
};

const { AppContext, useContext } = createContext<AppState>('appState');

export const Provider = AppContext.Provider;

export const useAppStateContext = (): AppState => {
    return useContext();
};



export class AppState {

    public readonly userAuthentication:UserAuthentication;

    public constructor(){
        this.userAuthentication = new UserAuthentication();
    }
}
