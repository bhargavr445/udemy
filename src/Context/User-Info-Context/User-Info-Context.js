import { createContext, useContext } from "react";

export const UdemyUserInfoContext = createContext(null);

export function useUdemyContext() {
    const user = useContext(UdemyUserInfoContext);

    if (user == null) {
        throw new Error('Please Provide Context and make sure...')
    }
    return user;
}

