import { createContext, useMemo, useState } from "react";

export const UserProfileContext = createContext({userName: '', role: ''});

export const  UserProfileContextProvider = ({children}) => {

    const [userProfile, setUserProfile] = useState(null);

    function setUserProfileFromApi(value) {
        setUserProfile(value);
    }

    const contextValue = useMemo(() => ({ userProfile, setUserProfileFromApi }), [userProfile]);

    return <UserProfileContext.Provider value={contextValue}>{children}</UserProfileContext.Provider>

}