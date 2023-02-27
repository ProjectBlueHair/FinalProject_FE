import * as React from 'react';

const Apptest = (): JSX.Element => {

    const [number, setNumber] = React.useState<number>(0);

    return (
        <div>
            <h2>Hello. Jest!!</h2>
            <h4>number: {number}</h4>
            <button onClick={() => setNumber(number+3)}>증가</button>
            <button onClick={() => setNumber(number-2)}>감소</button>
        </div>
    )
}

export default Apptest;