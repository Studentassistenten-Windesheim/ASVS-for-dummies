import ASVSItem from '../model/ASVSItem';
import React from 'react';
import ASVSSearch from './ASVSSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbTack, faThumbtack } from '@fortawesome/free-solid-svg-icons';

type Props = {
  items: ASVSItem[];
  pinnedItems: ASVSItem[];
  setItemStatus: (itemId: string, completed: boolean) => void;
  setSearchInputCheck: (searchInput: string) => void;
  setPinStatus: (itemId: string) => void;
};

const ASVSList: React.FC<Props> = ({
  items,
  pinnedItems,
  setItemStatus,
  setSearchInputCheck,
  setPinStatus,
}) => {
  const filteredItems = items.filter((i: ASVSItem) => i.show);
  const isPinned = (itemId: string) => {
    return pinnedItems.length > 0
      ? pinnedItems.some((item) => item.req_id === itemId)
      : false;
  };

  return (
    <>
      <div className='flex'>
        <h2 className='mt-6'>
          List <small>{filteredItems.length.toString()}</small>
        </h2>
        <ASVSSearch
          setSearchInputCheck={(c: string) => setSearchInputCheck(c)}
        ></ASVSSearch>
      </div>

      <table className='border-separate border-spacing-2'>
        <thead>
          <tr className='text-left'>
            <th>Status</th>
            <th>Chapter, Section & Id</th>
            <th className='w-2/5'>Requirement</th>
            <th className='w-[30%]'>Quick reference guide chapter</th>
          </tr>
        </thead>
        <tbody className='align-text-top'>
          {items.map((item: ASVSItem, index: number) => (
            <tr
              key={`item-${index.toString()}`}
              className={`${item.show} ${!item.show ? 'hidden' : ''}`}
              data-cy='asvs-list-item'
            >
              <td>
                <input
                  type='checkbox'
                  id={item.req_id}
                  checked={item.completed}
                  onChange={(e) => {
                    setItemStatus(item.req_id, e.target.checked);
                  }}
                />
                <label
                  htmlFor={item.req_id}
                  className={`${item.completed ? 'text-lime-600' : ''}`}
                >
                  {item.completed ? 'DONE' : 'TODO'}
                </label>
              </td>
              <td>
                {item.chapter_id} {item.chapter_name} <br />
                {item.section_id} {item.section_name} <br />
                Level 1 {item.level1} <br />
                Level 2 {item.level2} <br />
                Level 3 {item.level3}
              </td>
              <td>
                {item.req_id} &nbsp;
                {item.req_description}
              </td>
              <td className='relative pr-4'>
                {item.quick_reference}
                <FontAwesomeIcon
                  className={`absolute top-0 right-0 h-5 w-5 transition duration-300 ease-in-out ${
                    isPinned(item.req_id)
                      ? 'text-[#db0a0a] rotate-45 hover:rotate-0 hover:text-[#9e9e9e]'
                      : 'text-[#9e9e9e] hover:rotate-45 hover:text-[#db0a0a]'
                  }`} //hover:rotate-45 transition duration-300 ease-in-out`}
                  icon={faThumbtack}
                  onClick={() => {
                    setPinStatus(item.req_id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ASVSList;
