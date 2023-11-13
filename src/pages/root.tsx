import { useCallback, useEffect, useState } from 'react';
import ASVSList from '../components/ASVSList';
import ASVSListFilter from '../components/ASVSListFilter';
import ASVSChapter from '../model/ASVSChapter';
import ASVSItem from '../model/ASVSItem';
import { asvsListItemsAPI } from '../api/ASVSApi';
import ASVSSearch from '../components/ASVSSearch';
import { debug } from 'util';
import { isModuleNamespaceObject } from 'util/types';

const Root = () => {
    const [asvsItems, setAsvsItems] = useState<ASVSItem[]>([]);
    const [chapters, setChapters] = useState<ASVSChapter[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [levels, setLevels] = useState<{ [key: string]: boolean }>({
        level1: false,
        level2: false,
        level3: false,
    });
    const [showIncompleteOnly, setShowIncompleteOnly] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            const items = await asvsListItemsAPI();

            const chapters: ASVSChapter[] = Array.from(
                items.reduce((p: any, c: ASVSItem) => {
                    p.add(c.chapter_name);
                    return p;
                }, new Set())
            ).map((c: any) => {
                return new ASVSChapter(c);
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
    };

    const setLevelCheck = (levelName: string) => {
        setLevels((prevState) => ({
            ...prevState,
            [levelName]: !prevState[levelName],
        }));
    };

    const setSearchInputCheck = (input: string) => {
        setSearchInput(input.toLowerCase());
    };

    const filteredASVSItems = useCallback(() => {
        const checkedChapters = chapters
            .filter((c: ASVSChapter) => c.checked)
            .map((c: ASVSChapter) => c.name);
        const levelFilter: boolean =
            levels.level1 || levels.level2 || levels.level3;

        return asvsItems
            .map((i: ASVSItem) => {
                i.show = true;
                if (levelFilter) {
                    let shouldShow = false;

                    if (levels.level1 && i.level1 !== '') shouldShow = true;
                    if (levels.level2 && i.level2 !== '') shouldShow = true;
                    if (levels.level3 && i.level3 !== '') shouldShow = true;
                    i.show = shouldShow;
                }
                return i;
            })
            .map((i: ASVSItem) => {
                if (
                    checkedChapters.length > 0 &&
                    checkedChapters.indexOf(i.chapter_name) === -1
                ) {
                    i.show = false;
                }
                return i;
            })
            .map((i: ASVSItem) => {
                if (showIncompleteOnly == "incomplete" && i.completed) {
                    i.show = false;
                }
                if (showIncompleteOnly == "complete" && !i.completed) {
                    i.show = false;
                }
                return i;
            })
            .map((i: ASVSItem) => {
                if (searchInput && i.show) {
                    const shouldShow =
                        i.req_id.toLowerCase().includes(searchInput) ||
                        i.req_description.toLowerCase().includes(searchInput) ||
                        i.section_id.toLowerCase().includes(searchInput) ||
                        i.section_name.toLowerCase().includes(searchInput) ||
                        i.chapter_name.toLowerCase().includes(searchInput) ||
                        i.chapter_id.toLowerCase().includes(searchInput) ||
                        i.quick_reference.toLowerCase().includes(searchInput);
                    i.show = shouldShow;
                }
                return i;
            });
    }, [chapters, levels, asvsItems, searchInput]);

    function setItemStatus(itemId: string, completed: boolean): void {
        // Find the item that was clicked
        const asvsItem = asvsItems.find((item: ASVSItem) => item.req_id == itemId);
        if (asvsItem) {
            asvsItem.completed = completed;
        }
        localStorage.setItem(itemId, JSON.stringify(completed));
        // Force a new array to be created so that React will re-render the component
        setAsvsItems([...asvsItems]);
    }

    function toggleShowIncompleteOnly(c: string): void {
        setShowIncompleteOnly(c);
        // Force a new array to be created so that React will re-render the component
        setAsvsItems([...asvsItems]);
    }

    return (
        <>
            <div className="flex">
                {/*Sidebar*/}
                <aside className="w-64 fixed p-1 h-[90vh]">
                    <ASVSListFilter
                        chapters={chapters}
                        setChapterCheck={(c: string) => setChapterCheck(c)}
                        setLevelCheck={(c: string) => setLevelCheck(c)}
                        toggleShowIncompleteOnly={(c: string) => toggleShowIncompleteOnly(c)}
                    />
                </aside>

                {/*Main content*/}
                <main className="flex-1 p-1 pl-64">
                    <h1 className="py-2">
                        ASVS for Dummies <small>(ASVS 4.0)</small>
                    </h1>

                    <ASVSList
                        items={filteredASVSItems()}
                        setItemStatus={(i: string, c: boolean) => setItemStatus(i, c)}
                        setSearchInputCheck={(c: string) => setSearchInputCheck(c)}
                    ></ASVSList>
                </main>
            </div>
            {/*
            <div className="container flex flex-row">
                <aside className="w-1/6 p-1">
                    <ASVSListFilter
                        chapters={chapters}
                        setChapterCheck={(c: string) => setChapterCheck(c)}
                        setLevelCheck={(c: string) => setLevelCheck(c)}
                        toggleShowIncompleteOnly={(c: string) => toggleShowIncompleteOnly(c)}
                    />
                </aside>

                <main className="w-5/6 p-1">
                    <h1 className="py-2">
                        ASVS for Dummies <small>(ASVS 4.0)</small>
                    </h1>

                    <ASVSList
                        items={filteredASVSItems()}
                        setItemStatus={(i: string, c: boolean) => setItemStatus(i, c)}
                        setSearchInputCheck={(c: string) => setSearchInputCheck(c)}
                    ></ASVSList>
                </main>
            </div>
            */}
        </>
    );
};

export default Root;
