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
      <div>
        <h2 className='mt-6'>
          Pinned items <small>{items.length.toString()}</small>
        </h2>
      </div>

      <table className='border-seperate border-spacing-2'>
        <thead>
          <tr className='text-left'>
            <th>Status</th>
            <th>Requirement</th>
          </tr>
        </thead>
        <tbody className='align-text-top'>
          {items.map((item: ASVSItem, index: number) => (
            <tr key={`item-${index.toString()}`} data-cy='asvs-pinned-item'>
              <td>
                <input
                  type='checkbox'
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
              <td className='relative pr-8'>
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
    </>
  );
};

export default ASVSPinnedItems;
