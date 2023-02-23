import React from 'react';
import './ASVSItem.css';

const ASVSItem = ({item}) => {
    return (

        <div className='ASVSItem-wrap'>
            <div className='ASVSItem-spec'>
                <div className='ASVSItem-spec__metadata'>
                    <p><strong>{item.req_id}</strong> levels: ({item.level1}) ({item.level2}) ({item.level3})</p>
                    <p>Chapter {item.chapter_id} {item.chapter_name}</p>
                    <p>Section {item.section_id} {item.section_name}</p>
                </div>
                <div className='ASVSItem-spec__body'>
                    <p>{item.req_description}</p>
                </div>
            </div>
            <div className="ASVSItem-measurements">
                no measurements
            </div>
            <div className="ASVSItem-example">
                no technical example
            </div>
        </div>
    );
};
export default ASVSItem;
