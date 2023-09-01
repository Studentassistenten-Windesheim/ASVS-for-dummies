import React from "react";
import ASVSChapter from "../model/ASVSChapter";
import './ASVSListFilter.css';

type Props = {
    chapters: ASVSChapter[],
    setChapterCheck: (chapterName: string) => void
    setLevelCheck: (levelName: string) => void
}

class ASVSListFilter extends React.Component<any, Props> {

    render() {
        return <>
            <div className="checkboxCollections">
                {this.props.chapters
                    .reduce((p: any, c: ASVSChapter, i: number) => {
                        const index = i % 4;
                        if (p.length === 0 || !p[index]) p.push([]);
                        p[index].push(c);
                        return p;
                    }, [])
                    .map((col: [], index: number) => {
                        return <div key={`col- ${index.toString()}`}>

                            {col.map((element: ASVSChapter, index: number) => {
                                return <div key={index.toString()}>

                                    <input

                                        type="checkbox"
                                        id={index.toString()}
                                        name={element.name}
                                        value={element.checked ? 'checked' : ''}
                                        onChange={(e) => {
                                            this.props.setChapterCheck(element.name)
                                        }}
                                    />
                                    <label htmlFor={index.toString()}>
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
                                this.props.setLevelCheck("level1")
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
                                this.props.setLevelCheck("level2")
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
                                this.props.setLevelCheck("level3")
                            }}
                        />
                        <label htmlFor="level-3-checkbox">
                            Level 3
                        </label>
                    </div>
                </div>
            </div>

        </>

    }
}

export default ASVSListFilter;
