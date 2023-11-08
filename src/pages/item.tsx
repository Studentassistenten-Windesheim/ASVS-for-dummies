import React, { useCallback, useEffect, useState } from "react"
import { redirect, redirectDocument, useParams } from "react-router-dom"
import { asvsListItemsAPI } from "../api/ASVSApi";
import ASVSItem from "../model/ASVSItem";

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
        <div className="container">
            <h1>{asvsItem.req_id}</h1>
        </div>
    );
}

export default Item;