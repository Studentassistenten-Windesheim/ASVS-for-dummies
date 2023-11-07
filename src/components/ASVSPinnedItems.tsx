import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ASVSItem from '../model/ASVSItem';
import React from 'react';

type Props = {
  items: ASVSItem[];
  setItemStatus: (itemId: string, completed: boolean) => void;
  setPinStatus: (itemId: string) => void;
};

const ASVSPinnedItems: React.FC<Props> = ({
  items,
  setItemStatus,
  setPinStatus,
}) => {
  if (items.length === 0) {
    return <></>;
  }
  return (
    <>
      <div
        className='flex-grow overflow-auto shadow-md sm:rounded-lg'
        style={{ overflowX: 'hidden' }}
      >
        <table className='w-full text-base text-left text-gray-900'>
          <caption className='p-1 text-lg font-semibold text-left text-gray-900 bg-gray-50'>
            <div className='flex flex-wrap items-center'>
              <h2 className='p-2'>
                Pinned items <small>{items.length.toString()}</small>
              </h2>
            </div>
          </caption>
          <thead className='top-0 px-6 py-3 text-xs text-gray-700 uppercase bg-gray-200'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Requirement
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto align-text-top'>
            {items.map((item: ASVSItem, index: number) => (
              <tr
                key={`item-${index.toString()}`}
                className={`${item.show} ${
                  !item.show ? 'hidden' : ''
                } + " odd:bg-white even:bg-gray-50 border-b"`}
                data-cy='asvs-pinned-item'
              >
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
                      type='checkbox'
                      id={item.req_id}
                      value=''
                      checked={item.completed}
                      onChange={(e) => {
                        setItemStatus(item.req_id, e.target.checked);
                      }}
                    />
                    <label htmlFor={item.req_id} className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <td className='relative px-6 py-4'>
                  {item.req_id} &nbsp;
                  {item.req_description}
                  <FontAwesomeIcon
                    className='absolute top-[-8px] right-[-8px] h-5 w-5 text-[#db0a0a] rotate-45 hover:rotate-0 hover:text-[#9e9e9e] transition duration-300 ease-in-out'
                    icon={faThumbtack}
                    onClick={() => {
                      setPinStatus(item.req_id);
                    }}
                    data-cy='asvs-pin'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ASVSPinnedItems;