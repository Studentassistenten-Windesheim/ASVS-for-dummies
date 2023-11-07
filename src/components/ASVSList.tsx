import ASVSItem from '../model/ASVSItem';
import React from 'react';
import ASVSSearch from './ASVSSearch';

type Props = {
    items: ASVSItem[];
    setItemStatus: (itemId: string, completed: boolean) => void;
    setSearchInputCheck: (searchInput: string) => void;
};

// Detect links in text and make them clickable
const DetectLink = ({ children }: any) => {
    const extractUrl = (word: string) => {
        const urlPattern = /\((https?:\/\/\S+?)\)/g; // Regex pattern to find links
        const match = urlPattern.exec(word);
        return match ? match[1] : null;
    }

    const url = extractUrl(children);

    if (url) {
        // If a URL is found, split the children into parts (text before URL and URL)
        const parts = children.split(url);

        return (
            <span>
                {parts[0]} {/* Render text before the URL */}
                <a href={url} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                    {url}
                </a>
                {parts[1]} {/* Render text after the URL */}
            </span>
        );
    } else {
        return <span>{children}</span>;
    }
}

const ASVSList: React.FC<Props> = ({
    items,
    setItemStatus,
    setSearchInputCheck,
}) => {
    const filteredItems = items.filter((i: ASVSItem) => i.show);

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
                    <thead className='top-0 px-6 py-3 text-xs text-gray-700 uppercase bg-gray-200'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Chapter, Section & Id
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Requirement
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Quick reference guide chapter
                            </th>
                        </tr>
                    </thead>
                    <tbody className='h-96 overflow-y-auto align-text-top'>
                        {/*Map all items to html*/}
                        {filteredItems.map((item: ASVSItem, index: number) => (
                            <tr key={`item-${index.toString()}`}
                                className={`${item.show} ${!item.show ? 'hidden' : ''} + " odd:bg-white even:bg-gray-50 border-b"`}
                                data-cy='asvs-list-item'>
                                <td className='w-4 p-4'>
                                    <div className="flex items-center">
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
                                        <label htmlFor={item.req_id} className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {item.chapter_id} {item.chapter_name} <br />
                                    {item.section_id} {item.section_name} <br />
                                    <div className="flex flex-wrap">
                                        {item.level1.startsWith("✓") && <span className='bg-green-200 text-green-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 1</span>}
                                        {item.level2.startsWith("✓") && <span className='bg-yellow-200 text-yellow-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 2</span>}
                                        {item.level3.startsWith("✓") && <span className='bg-red-200 text-red-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 3</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {item.req_id} &nbsp;
                                    <DetectLink>
                                        {item.req_description}
                                    </DetectLink>
                                </td>
                                <td className="px-6 py-4">
                                    {item.quick_reference} <br/>
                                    {item.cwe != "" && <a href={'https://cwe.mitre.org/data/definitions/' + item.cwe + '.html'} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                                        CWE:{item.cwe}
                                    </a>}
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