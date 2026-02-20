import React, { useEffect } from 'react'

export default function UserProfileCheck({ children, permission }) {

    useEffect(() => {
        // console.log(permission);

        return () => {
            // console.log('Destructor...');
        }
    }, []);
    return children;
}
