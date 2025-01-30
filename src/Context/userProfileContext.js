import { createContext, useState } from "react";

export const UserProfileContext = createContext({userName: '', role: ''});

export const  UserProfileContextProvider = ({children}) => {

    const [userProfile, setUserProfile] = useState(null);

    function setUserProfileFromApi(value) {
        setUserProfile(value);
    }


    return <UserProfileContext value={{userProfile, setUserProfileFromApi}}>{children}</UserProfileContext>

}