import ASVSItem from "../model/ASVSItem";
import React from "react";

type Props = {
  setSearchInputCheck: (searchInput: string) => void;
};

const ASVSSearch: React.FC<Props> = ({ setSearchInputCheck }) => {
  const handleChange = (searchInput: any) => {
    setSearchInputCheck(searchInput.target.value);
  };

  return (
    <>
      <div>
        <input
          className="w-50% sm:w-48 h-8 p-2 mt-8 mb-1 border rounded-lg mb-4 focus:outline-none focus:border-gray-500 focus:ring-gray-200 hover:border-gray-300 shadow-sm"
          type="text"
          placeholder="Search here"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default ASVSSearch;
