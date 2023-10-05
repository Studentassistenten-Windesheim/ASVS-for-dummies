import React from "react";
import ASVSChapter from "../model/ASVSChapter";

type Props = {
    chapters: ASVSChapter[],
    setChapterCheck: (chapterName: string) => void
    setLevelCheck: (levelName: string) => void
    toggleShowIncompleteOnly: (show: boolean) => void
}

const ASVSListFilter: React.FC<Props> = ({ chapters, setChapterCheck, setLevelCheck, toggleShowIncompleteOnly }) => {
    return (
        <>
            <div className="flex justify-between mt-4">
                {chapters
                    .reduce((p: any, c: ASVSChapter, i: number) => {
                        const index = i % 4;
                        if (p.length === 0 || !p[index]) p.push([]);
                        p[index].push(c);
                        return p;
                    }, [])
                    .map((col: [], colIndex: number) => {
                        return <div key={`col-${colIndex.toString()}`}>

                            {col.map((element: ASVSChapter, rowIndex: number) => {
                                const checkboxId = `checkbox-${colIndex}-${rowIndex}`;
                                return <div key={rowIndex.toString()}>

                                    <input
                                        type="checkbox"
                                        id={checkboxId.toString()}
                                        name={element.name}
                                        checked={element.checked}
                                        onChange={(e) => {
                                            setChapterCheck(element.name)
                                        }}
                                    />
                                    <label htmlFor={checkboxId.toString()}>
                                        {element.name}
                                    </label>

                                </div>
                            })}

                        </div>

                    })
                }
                <div>
                    <div key="level-1-checkbox">
                        <input
                            type="checkbox"
                            id="level-1-checkbox"
                            name="level-1"
                            value=''
                            onChange={(e) => {
                                setLevelCheck("level1")
                            }}
                        />
                        <label htmlFor="level-1-checkbox">
                            Level 1
                        </label>
                    </div>
                    <div key="level-2-checkbox">
                        <input
                            type="checkbox"
                            id="level-2-checkbox"
                            name="level-2"
                            value=''
                            onChange={(e) => {
                                setLevelCheck("level2")
                            }}
                        />
                        <label htmlFor="level-2-checkbox">
                            Level 2
                        </label>
                    </div>
                    <div key="level-3-checkbox">
                        <input
                            type="checkbox"
                            id="level-3-checkbox"
                            name="level-3"
                            value=''
                            onChange={(e) => {
                                setLevelCheck("level3")
                            }}
                        />
                        <label htmlFor="level-3-checkbox">
                            Level 3
                        </label>
                    </div>
                </div>

                <div key="show-incomplete-only">
                    <input
                        type="checkbox"
                        id="show-incomplete-only"
                        name="Show incomplete only"
                        value=''
                        onChange={(e) => {
                            toggleShowIncompleteOnly(e.target.checked)
                        }}
                    />
                    <label htmlFor="show-incomplete-only">
                        Show incomplete only
                    </label>
                </div>

            </div>

        </>
    );
}

export default ASVSListFilter;
