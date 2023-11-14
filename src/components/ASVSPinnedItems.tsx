import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ASVSItem from '../model/ASVSItem';
import React from 'react';

type Props = {
  items: ASVSItem[];
  setItemStatus: (itemId: string, completed: boolean) => void;
  setPinStatus: (itemId: string) => void;
  unpinAll: () => void;
};

const ASVSPinnedItems: React.FC<Props> = ({
  items,
  setItemStatus,
  setPinStatus,
  unpinAll,
}) => {
  if (items.length === 0) {
    return <></>;
  }

  function handleClickToScroll(id: string) {
    const element = document.getElementById(`item-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.animate(
        [{ backgroundColor: 'gray' }, { backgroundColor: 'transparent' }],
        {
          duration: 1500,
          easing: 'ease-in-out',
        }
      );
    }
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
              <p
                className='pt-2 pl-2 text-blue-500 underline text-align-center hover:cursor-pointer hover:text-blue-600'
                onClick={(e) => unpinAll()}
              >
                Unpin all
              </p>
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
                key={`pinned-item-${index.toString()}`}
                className={`odd:bg-white even:bg-gray-50 border-b`}
                data-cy='asvs-pinned-item'
                onClick={() => {
                  handleClickToScroll(item.req_id);
                }}
              >
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
                      type='checkbox'
                      id={`pinned-${item.req_id}`}
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
                    className='absolute top-0 right-0 h-5 w-5 text-[#db0a0a] rotate-45 hover:rotate-0 hover:text-[#9e9e9e] transition duration-300 ease-in-out'
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
