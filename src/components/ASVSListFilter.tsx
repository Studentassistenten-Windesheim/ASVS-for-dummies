import React from 'react';
import ASVSChapter from '../model/ASVSChapter';
import ASVSChapterFilterItem from './ASVSChapterFilterItem';

type Props = {
    chapters: ASVSChapter[],
    setChapterCheck: (chapterName: string) => void
    setLevelCheck: (levelName: string) => void
    toggleShowIncompleteOnly: (show: boolean) => void
}

const ASVSListFilter: React.FC<Props> = ({ chapters, setChapterCheck, setLevelCheck, toggleShowIncompleteOnly }) => {
    return (
        <>
            <aside className="w-1/6 p-1">
                <div className="rounded h-full px-2 py-2 bg-gray-50 font-normal">

                    {/*Show complete/incomplete only*/}
                    <ul>
                        <li>
                            <p className="font-bold">Completed</p>
                        </li>
                        <li>
                            <div key='show-complete-only' className='pl-3'>

                                {/*TODO: Create function to show completed only*/}

                                <input
                                    type='checkbox'
                                    id='show-complete-only'
                                    className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    name='Show complete only'
                                    value=''
                                    onChange={(e) => {
                                        toggleShowIncompleteOnly(e.target.checked)
                                    }}
                                />
                                <label htmlFor='show-complete-only' className='w-full py-2 ml-1 text-sm text-gray-900'>
                                    Show Complete only
                                </label>
                            </div>

                            <div key='show-incomplete-only' className='pl-3'>
                                <input
                                    type='checkbox'
                                    id='show-incomplete-only'
                                    className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    name='Show incomplete only'
                                    value=''
                                    onChange={(e) => {
                                        toggleShowIncompleteOnly(e.target.checked)
                                    }}
                                />
                                <label htmlFor='show-incomplete-only' className='w-full py-2 ml-1 text-sm text-gray-900'>
                                    Show incomplete only
                                </label>
                            </div>
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
                                <ASVSChapterFilterItem name={chapter.name} checked={chapter.checked} toggleFunction={setChapterCheck} ></ASVSChapterFilterItem>
                            ))
                        }
                    </ul>

                </div>
            </aside>
        </>
    );
}

export default ASVSListFilter;
