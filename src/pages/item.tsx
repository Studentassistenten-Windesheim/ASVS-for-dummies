import React, { useCallback, useEffect, useState } from "react"
import { redirect, redirectDocument, useParams } from "react-router-dom"
import { asvsListItemsAPI } from "../api/ASVSApi";
import ASVSItem from "../model/ASVSItem";
import DetectLink from "../helpers/DetectLink";
import NotesSection from "../components/NotesSection";
import EditableTextField from "../components/EditableTextField";

const Item = () => {
    const [asvsItem, setAsvsItem] = useState<ASVSItem>();
    const { itemId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const items = await asvsListItemsAPI();
            const item: ASVSItem = items.find(i => i.req_id.split('.').join("_") == itemId);
            setAsvsItem(item);

            if (!asvsItem) {
                redirectDocument('/error-page');
            }
        };

        fetchData();
    }, []);

    // Show a message when the ASVS item is not found
    if (!asvsItem) {
        return (
            <div className="container">
                <h1>Item not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/*Title and levels*/}
            <div className="col-span-full">
                <h1 className="text-4xl font-bold mb-4">{asvsItem.req_id} <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">{asvsItem.section_name} - {asvsItem.chapter_name} </small></h1>
                <div className="flex">
                    {asvsItem.level1 != "" && <span className='bg-green-200 text-green-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 1</span>}
                    {asvsItem.level2 != "" && <span className='bg-yellow-200 text-yellow-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 2</span>}
                    {asvsItem.level3 != "" && <span className='bg-red-200 text-red-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 3</span>}
                </div>
            </div>

            {/*Description*/}
            <div className="col-span-full">
                <p className="mb-4"><DetectLink>{asvsItem.req_description}</DetectLink></p>
            </div>

            {/*Tips and help*/}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Tips and help</h2>
                <ul className="list-disc pl-4">
                    <li>Tip 1</li>
                    <li>Tip 2</li>
                </ul>
            </div>

            {/*Quick reference and CWE*/}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Quick Reference and CWE</h2>
                <p>{asvsItem.quick_reference}</p>
                <p>Common Weakness Enumeration (CWE): {asvsItem.cwe != "" && <a href={'https://cwe.mitre.org/data/definitions/' + asvsItem.cwe + '.html'} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                    CWE:{asvsItem.cwe}
                </a>}</p>
            </div>

            {/*Notes*/}
            <div className="col-span-full mb-4">
                <h2 className="text-2xl font-semibold">Notes</h2>
                <EditableTextField initialValue={""} storageKey={"NotesFor" + asvsItem.req_id}></EditableTextField>
                {/*<NotesSection pageId={asvsItem.req_id}></NotesSection>*/}
            </div>
        </div>
    );
}

export default Item;