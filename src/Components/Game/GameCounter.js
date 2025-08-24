import React, { memo, useCallback, useState } from 'react'

const functionRef = [];

function GameCounter() {

    const [counter, setCounter] = useState(0);

    const stu = { name: 'Bhargav' };
    const stu1 = { name: 'Bhargav' };

    console.log(stu === stu1);

    const updateCounter = useCallback(function updateCounter() {
        setCounter((prevValue) => prevValue + 1);
    }, [])

    functionRef.push(updateCounter);

    if (functionRef.length >= 2) {
        if (functionRef[0] === functionRef[1]) {
            console.log('Equal');
        }
    }

    return (
        <>
            <div>
                {counter}
            </div>
            <title>Udemy - {counter}</title>
            <button onClick={updateCounter}>Counter</button>
        </>
    )
}

export default memo(GameCounter);