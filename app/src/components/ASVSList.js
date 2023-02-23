//ASVSList.js

import React from 'react';
import ASVSItem from './ASVSItem';
import '../index.css';

const ASVSList = ({asvsItems}) => {
    console.log(asvsItems)
    return (
        <div className='asvsList-wrap'>
            {asvsItems.map(item => (
                <ASVSItem item={item} key={item.req_id}/>
            ))}

        </div>
    );
};
export default ASVSList;
