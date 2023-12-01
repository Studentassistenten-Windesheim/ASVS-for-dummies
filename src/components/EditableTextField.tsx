import React, { useState, useEffect, ChangeEvent } from 'react';

interface EditableTextFieldProps {
    initialValue: string;
    storageKey: string;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({ initialValue, storageKey }) => {
    const [value, setValue] = useState<string>(initialValue);

    useEffect(() => {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue) {
            setValue(storedValue);
        }
    }, [storageKey]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        localStorage.setItem(storageKey, newValue);
    };

    return (
        <>
            <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your notes here..."
                value={value}
                onChange={handleChange}
            ></textarea>
        </>
    );
};

export default EditableTextField;
