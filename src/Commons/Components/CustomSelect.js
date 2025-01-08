import React from 'react'

export default function CustomSelect({ optionsList, displayProp, onOptionSelection = () => { } }) {

    function selectionChange(event) {
        onOptionSelection(JSON.parse(event.target.value))
    }

    return (
        <div className='custom_dropdown'>
            <select className='custom_select' onChange={(e) => selectionChange(e)}>
                {
                    optionsList.map((optionData) => <option
                        key={optionData[displayProp]}
                        value={JSON.stringify(optionData)}>
                        {optionData[displayProp]}
                    </option>)
                }
            </select>
        </div>
    )
}
