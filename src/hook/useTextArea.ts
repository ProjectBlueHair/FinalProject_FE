import { useState } from 'react';



const useTextArea = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange: handleChange
    };
};

export default useTextArea;
