import ASVSItem from '../model/ASVSItem';
import React, { useEffect, useRef } from 'react';

type Props = {
  setSearchInputCheck: (searchInput: string) => void;
};

const ASVSSearch: React.FC<Props> = ({ setSearchInputCheck }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (searchInput: any) => {
    setSearchInputCheck(searchInput.target.value);
  };

  useEffect(() => {
    const keyUpHandler = (event: any) => {
      if (event.key == '/' && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return (
    <>
      <div>
        <input
          id='search-bar'
          ref={searchInputRef}
          className='w-50% sm:w-48 h-8 p-2 border rounded-lg focus:outline-none focus:border-gray-500 focus:ring-gray-200 hover:border-gray-300 shadow-sm'
          type='text'
          placeholder='Press / to search'
          onChange={handleChange}
          data-cy='search-input'
        />
      </div>
    </>
  );
};

export default ASVSSearch;
