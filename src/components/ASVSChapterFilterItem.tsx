import React from 'react';

type Props = {
    name: string,
    checked: boolean,
    toggleFunction: (name: string) => void,
}

const ASVSChapterFilterItem: React.FC<Props> = ({ name, checked, toggleFunction }) => {
    return (
        <>
            <li>
                <div key={name} className='pl-3'>
                    <input
                        type='checkbox'
                        id={name}
                        className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                        name={name}
                        checked={checked}
                        onChange={(e) => {
                            toggleFunction(name);
                        }}
                        data-cy='filterCheckbox'
                    />
                    <label htmlFor={name} className='w-full py-1 ml-2 text-sm text-gray-900'>{name}</label>
                </div>
            </li>
        </>
    );
}

export default ASVSChapterFilterItem;
