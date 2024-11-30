import { createContext, useContext, useState } from "react";

//  context to store data
export const UniversityContext = createContext();

//  provider to update/remove data from context
export const UniversityProvider = ({ children }) => {
    const [selectedUniversities, setSelectedUniversities] = useState([]);

    const addOrRemoveUniversityToCart = (university) => {
        // check if university already selected.
        const index = selectedUniversities.findIndex((uni) => uni?.domains.length === university?.domains.length && uni?.domains[0] === university?.domains[0])
        // if selected already, then remove university from the context
        if (index > -1) {
            const selectedUn = JSON.parse(JSON.stringify(selectedUniversities))
            selectedUn.splice(index, 1);
            setSelectedUniversities(selectedUn);

            //
        } else {
            setSelectedUniversities(universities => [...universities, university]);
        }
    }

    return <UniversityContext.Provider value={{ selectedUniversities, addOrRemoveUniversityToCart }}>
        {children}
    </UniversityContext.Provider>

}

// created custom hook, components can access this custom hook `useUniversityContext` and can access `selectedUniversities` and `addOrRemoveUniversityToCart`
export function useUniversityContext() {
    const UniversityInfoFromContext = useContext(UniversityContext)
    return UniversityInfoFromContext
}