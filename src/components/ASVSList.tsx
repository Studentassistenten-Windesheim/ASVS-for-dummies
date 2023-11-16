import ASVSItem from '../model/ASVSItem';
import React from 'react';
import ASVSSearch from './ASVSSearch';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    items: ASVSItem[];
    pinnedItems: ASVSItem[];
    setItemStatus: (itemId: string, completed: boolean) => void;
    setSearchInputCheck: (searchInput: string) => void;
    setPinStatus: (itemId: string) => void;
};

// Detect links in text and make them clickable
const DetectLink = ({ children }: any) => {
    const extractUrl = (word: string) => {
        const urlPattern = /\((https?:\/\/\S+?)\)/g; // Regex pattern to find links
        const match = urlPattern.exec(word);
        return match ? match[1] : null;
    };

    const url = extractUrl(children);

    if (url) {
        // If a URL is found, split the children into parts (text before URL and URL)
        const parts = children.split(url);

        return (
            <span>
                {parts[0]} {/* Render text before the URL */}
                <a
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    className='font-medium text-blue-600 hover:underline'
                >
                    {url}
                </a>
                {parts[1]} {/* Render text after the URL */}
            </span>
        );
    } else {
        return <span>{children}</span>;
    }
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
            <div className='flex-grow overflow-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-base text-left text-gray-900'>
                    <caption className='p-1 text-lg font-semibold text-left text-gray-900 bg-gray-50'>
                        <div className='flex flex-wrap items-center'>
                            <h2 className='p-2'>List <small>{filteredItems.length.toString()}</small></h2>
                            <div className='p-2'>
                                <ASVSSearch
                                    setSearchInputCheck={(c: string) => setSearchInputCheck(c)}
                                ></ASVSSearch>
                            </div>
                        </div>
                    </caption>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                        <tr>
                            <th scope='col' className='p-2'>
                                Chapter, Section & Id
                            </th>
                            <th scope='col' className='p-2'>
                                Requirement
                            </th>
                            <th scope='col' className='p-2'>
                                Quick reference guide chapter
                            </th>
                        </tr>
                    </thead>
                    <tbody className='h-96 overflow-y-auto align-text-top'>
                        {/*Map all items to html*/}
                        {filteredItems.map((item: ASVSItem, index: number) => (
                            <tr key={`item-${index.toString()}`}
                                id={`item-${item.req_id}`}
                                className={`${item.show} ${
                                    !item.show ? 'hidden' : ''
                                    } + " odd:bg-white even:bg-gray-50 border-b"`}
                                data-cy='asvs-list-item'>
                                <td className='p-2 w-1/4'>
                                    <div className="flex flex-wrap">
                                        <label htmlFor={item.req_id}>
                                            <input
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                type="checkbox"
                                                id={item.req_id}
                                                value=""
                                                checked={item.completed}
                                                onChange={(e) => {
                                                    setItemStatus(item.req_id, e.target.checked);
                                                }}
                                            />
                                            <span className="font-bold"> {item.section_id} </span> <span className="font-normal"> {item.chapter_name} - {item.section_name} </span>
                                        </label>

                                        {item.level1 != "" && <span className='bg-green-200 text-green-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 1</span>}
                                        {item.level2 != "" && <span className='bg-yellow-200 text-yellow-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 2</span>}
                                        {item.level3 != "" && <span className='bg-red-200 text-red-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 3</span>}
                                    </div>
                                </td>
                                <td className="p-2">
                                    <span className="font-bold">{item.req_id} </span>
                                    <DetectLink>
                                        {item.req_description}
                                    </DetectLink>
                                </td>
                                <td className="relative p-2">
                                    {item.quick_reference} <br />
                                    {item.cwe != "" && <a href={'https://cwe.mitre.org/data/definitions/' + item.cwe + '.html'} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                                        CWE:{item.cwe}
                                    </a>}

                                    <FontAwesomeIcon
                                        className={`absolute top-0 right-0 h-5 w-5 transition duration-300 ease-in-out ${isPinned(item.req_id)
                                            ? 'text-[#db0a0a] rotate-45 hover:rotate-0 hover:text-[#9e9e9e]'
                                            : 'text-[#9e9e9e] hover:rotate-45 hover:text-[#db0a0a]'
                                            }`}
                                        icon={faThumbtack}
                                        onClick={() => {
                                            setPinStatus(item.req_id);
                                        }}
                                        data-cy='asvs-list-pin'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ASVSList;
