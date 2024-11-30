import React from 'react';
import { UniversityProvider } from '../../Context/university/UniversityContext';
import UniversityOverview from './University-Overview';

function University() {
    return (
        <div>
            <UniversityProvider>
                <UniversityOverview />
            </UniversityProvider>
        </div>
    )
}

export default University;