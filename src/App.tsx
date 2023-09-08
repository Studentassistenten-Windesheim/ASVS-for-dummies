import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ASVSListFilter from "./components/ASVSListFilter";
import ASVSItem from "./model/ASVSItem";
import {asvsListItemsAPI} from "./api/ASVSApi";
import ASVSChapter from "./model/ASVSChapter";
import ASVSList from "./components/ASVSList";

const App = () => {
    const [asvsItems, setAsvsItems] = useState<ASVSItem[]>([]);
    const [chapters, setChapters] = useState<ASVSChapter[]>([]);
    const [levels, setLevels] = useState<{ [key: string]: boolean }>({
        level1: false,
        level2: false,
        level3: false
    });

    useEffect(() => {
        const fetchData = async () => {
            const items = await asvsListItemsAPI();
            const chapters: ASVSChapter[] =
                Array.from(items.reduce((p: any, c: ASVSItem) => {
                    p.add(c.chapter_name);
                    return p;
                }, new Set())).map((c: any) => {
                    return new ASVSChapter(c)
                });

            setAsvsItems(items);
            setChapters(chapters);
        };

        fetchData();
    }, []);


    const setChapterCheck = (chapterName: string) => {
        // Find the chapter that was clicked
        const chapter = chapters.find((c: ASVSChapter) => c.name === chapterName);
        if (chapter) {
            chapter.checked = !chapter.checked;
            // Force a new array to be created so that React will re-render the component
            setChapters([...chapters]);
        }
    }

    const setLevelCheck = (levelName: string) => {
        setLevels((prevState) => ({
            ...prevState,
            [levelName]: !prevState[levelName]
        }));
    }

    const filteredASVSItems = useCallback(() => {
        const checkedChapters = chapters
            .filter((c: ASVSChapter) => c.checked)
            .map((c: ASVSChapter) => c.name);
        const levelFilter: boolean =
            levels.level1 ||
            levels.level2 ||
            levels.level3;

        return asvsItems.map((i: ASVSItem) => {
            i.show = true;
            if (levelFilter) {
                let shouldShow = false;
                
                if (levels.level1 && i.level1 !== '') shouldShow = true;
                if (levels.level2 && i.level2 !== '') shouldShow = true;
                if (levels.level3 && i.level3 !== '') shouldShow = true;
                i.show = shouldShow
            }
            return i;
        }).map((i: ASVSItem) => {
            if (
                checkedChapters.length > 0 &&
                checkedChapters.indexOf(i.chapter_name) === -1
            ) {
                i.show = false;
            }
            return i;
        });
    }, [chapters, levels, asvsItems]);

    return (
        <div className="App">
            <header className="App-header">

            </header>
            <div className="container">
                <h1>ASVS for Dummies <small>(ASVS 4.0)</small></h1>
                <p><strong>tips:</strong></p>
                <ol>
                    <li>
                    Gebruik de <a rel="noreferrer" target="_blank" href="https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/">
                    quick reference guide</a>, daar wordt per requirement zoveel mogelijk naar verwezen.
                    </li>
                    <li>
                    Filter op level 1 en dan op een hoofdstuk. Zo kun je gestructureerd requirements verwerken.
                    </li>
                    <li>
                    Ga voor een requirement na of dit al afgevangen is door het framework. Voorbeeld behorend bij chapter Authentication, zoek op Google naar: 'identity framework password requirements'.
                    </li>
                </ol>

                <ASVSListFilter
                                chapters={chapters}
                                setChapterCheck={(c: string) => setChapterCheck(c)}
                                setLevelCheck={(c: string) => setLevelCheck(c)}/>
                <ASVSList items={filteredASVSItems()}></ASVSList>

            </div>
        </div>
    );
}

export default App;
