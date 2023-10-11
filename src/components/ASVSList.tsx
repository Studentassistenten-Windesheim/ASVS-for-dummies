import ASVSItem from "../model/ASVSItem";
import React from "react";

type Props = {
    items: ASVSItem[]
    setItemStatus: (itemId: string, completed: boolean) => void
}

const ASVSList: React.FC<Props> = ({ items, setItemStatus }) => {
    const filteredItems = items.filter((i: ASVSItem) => i.show);

    return (
        <>
            <h2 className='mt-6'>List <small>{filteredItems.length.toString()}</small></h2>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Chapter, Section & Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Requirement
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quick reference guide chapter
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item: ASVSItem, index: number) => (
                            <tr key={`item-${index.toString()}`}
                                className={`${item.show} ${!item.show ? "hidden" : ""} + " odd:bg-white even:bg-gray-50 border-b"`}
                                data-cy="asvs-list-item">
                                <th className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                                </th>
                                <td className="px-6 py-4">
                                    {item.chapter_id} {item.chapter_name} <br />
                                    {item.section_id} {item.section_name} <br />
                                    Level 1 {item.level1} <br />
                                    Level 2 {item.level2} <br />
                                    Level 3 {item.level3}
                                </td>
                                <td className="px-6 py-4">
                                    {item.req_id} &nbsp;
                                    {item.req_description}
                                </td>
                                <td className="px-6 py-4">
                                    {item.quick_reference}
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
