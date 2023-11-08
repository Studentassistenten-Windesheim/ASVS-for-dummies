import React from 'react';
import ASVSChapter from '../model/ASVSChapter';
import ASVSChapterFilterItem from './ASVSChapterFilterItem';

type Props = {
    chapters: ASVSChapter[],
    setChapterCheck: (chapterName: string) => void
    setLevelCheck: (levelName: string) => void
    toggleShowIncompleteOnly: (show: string) => void
}

const ASVSListFilter: React.FC<Props> = ({ chapters, setChapterCheck, setLevelCheck, toggleShowIncompleteOnly }) => {
    return (
        <>
            <aside className="fixed p-1 w-1/6">
                <div className="rounded-lg shadow h-full px-2 py-2 bg-gray-50 font-normal border-gray-400 border">

                    {/*Show complete/incomplete only*/}
                    <p className="font-bold">Completed</p>
                    <ul className="flex w-full gap-1">
                        <li>
                            <input type="radio" id="filter-incomplete" name="filter-complete" value="incomplete" className="hidden peer"
                                onChange={(e) => {
                                    toggleShowIncompleteOnly("incomplete");
                                }}/>
                            <label htmlFor="filter-incomplete" className="inline-flex w-full p-1 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                Incomplete
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="filter-all" name="filter-complete" value="all" className="hidden peer" defaultChecked
                                onChange={(e) => {
                                    toggleShowIncompleteOnly("all");
                                }}/>
                            <label htmlFor="filter-all" className="inline-flex w-full p-1 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                All
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="filter-complete" name="filter-complete" value="complete" className="hidden peer"
                                onChange={(e) => {
                                    toggleShowIncompleteOnly("complete");
                                }} />
                            <label htmlFor="filter-complete" className="inline-flex w-full p-1 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                Complete
                            </label>
                        </li>
                    </ul>

                    {/*Filter levels*/}
                    <ul className="pt-2 mt-2 border-t border-gray-400">
                        <li>
                            <p className="font-bold">Levels</p>
                        </li>

                        <li>
                            <div key='level-1-checkbox' className='pl-3'>
                                <input
                                    type='checkbox'
                                    id='level-1-checkbox'
                                    className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    name='level-1'
                                    value=''
                                    onChange={(e) => {
                                        setLevelCheck('level1')
                                    }}
                                    data-cy='level-checkbox'
                                />
                                <label htmlFor='level-1-checkbox'>
                                    <span className='bg-green-200 text-green-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 1</span>
                                </label>
                            </div>
                        </li>

                        <li>
                            <div key='level-2-checkbox' className='pl-3'>
                                <input
                                    type='checkbox'
                                    id='level-2-checkbox'
                                    className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    name='level-2'
                                    value=''
                                    onChange={(e) => {
                                        setLevelCheck('level2')
                                    }}
                                    data-cy='level-checkbox'
                                />
                                <label htmlFor='level-2-checkbox'>
                                    <span className='bg-yellow-200 text-yellow-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 2</span>
                                </label>
                            </div>
                        </li>
                        <li>

                            <div key='level-3-checkbox' className='pl-3'>
                                <input
                                    type='checkbox'
                                    id='level-3-checkbox'
                                    className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    name='level-3'
                                    value=''
                                    onChange={(e) => {
                                        setLevelCheck('level3')
                                    }}
                                    data-cy='level-checkbox'
                                />
                                <label htmlFor='level-3-checkbox'>
                                    <span className='bg-red-200 text-red-900 text-xs font-medium m-1 px-1.5 py-0.5 rounded'>Level 3</span>
                                </label>
                            </div>
                        </li>
                    </ul>

                    {/*Filter chapters*/}
                    <ul className="pt-2 mt-2 border-t border-gray-400">
                        <li>
                            <p className="font-bold">Chapters</p>
                        </li>
                        {chapters.map((chapter: ASVSChapter) => (
                            <ASVSChapterFilterItem key={chapter.name} name={chapter.name} checked={chapter.checked} toggleFunction={setChapterCheck} ></ASVSChapterFilterItem>
                        ))
                        }
                    </ul>

                </div>
            </aside>
        </>
    );
}

export default ASVSListFilter;
