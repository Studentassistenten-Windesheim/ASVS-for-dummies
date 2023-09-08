import ASVSItem from "../model/ASVSItem";
import React from "react";
import './ASVSList.css';
import './ASVSListItem.css';

type Props = {
    items: ASVSItem[]
}

const ASVSList: React.FC<Props> = ({ items }) => {
    const filteredItems = items.filter((i: ASVSItem) => i.show);

    return (
        <>
            <h2>List <small>{filteredItems.length.toString()}</small></h2>

            <div className="ASVSListItem">
                <div><h4>Chapter, Section & Id</h4></div>
                <div><h4>Requirement</h4></div>
                <div><h4>Quick reference guide chapter</h4></div>
            </div>

            {items.map((item: ASVSItem, index: number) => (
                <div key={`item-${index.toString()}`}
                    className={`ASVSListItem ${item.show} ${!item.show ? "hide" : ""}`}>
                    <div>
                        <p>{item.chapter_id} {item.chapter_name}</p>
                        <p>{item.section_id} {item.section_name}</p>
                        <p>Level 1 {item.level1}</p>
                        <p>Level 2 {item.level2}</p>
                        <p>Level 3 {item.level3}</p>
                    </div>
                    <div>
                        <p>{item.req_id} &nbsp;
                            {item.req_description}</p>
                    </div>
                    <div>
                        <p>{item.quick_reference}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ASVSList;
