import {React,  useState, useEffect } from 'react';
import Header from '../components/Header';
import { asvsList } from '../config/ASVSApi';
import EmptyList from "../components/EmptyList";
import ASVSList from "../components/ASVSList";


const ASVSPage = () => {

    const [asvsItems, setAsvsItems] = useState([]);

    // get content from owasp asvs list
    useEffect(() => {
        asvsList().then((res) => {
            // console.log(res.requirements);

            setAsvsItems(res.requirements)
        });
    }, []);

    return (
        <div>
            <Header/>

            {!asvsItems.length ? <EmptyList /> : <ASVSList asvsItems={asvsItems}/>}

        </div>
    );

}

export default ASVSPage;
