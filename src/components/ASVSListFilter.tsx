import React from 'react';
import ASVSChapter from '../model/ASVSChapter';
import 'flowbite';

type Props = {
    chapters: ASVSChapter[],
    setChapterCheck: (chapterName: string) => void
    setLevelCheck: (levelName: string) => void
    toggleShowIncompleteOnly: (show: boolean) => void
}

const ASVSListFilter: React.FC<Props> = ({ chapters, setChapterCheck, setLevelCheck, toggleShowIncompleteOnly }) => {
    return (
        <>
            <div id='accordion-collapse' data-accordion='collapse' className='py-2'>

                {/*Collapse button*/}
                <button type='button' id='collapse-heading' className='flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-gray-200' data-accordion-target='#accordion-collapse-body-2' aria-expanded='false' aria-controls='accordion-collapse-body-2'>
                    <h3>Filters</h3>
                    <svg data-accordion-icon className='w-3 h-3 rotate-180' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5 5 1 1 5' />
                    </svg>
                </button>

                {/*Collapsible filters*/}
                <div id='accordion-collapse-body-2' className='hidden' aria-labelledby='collapse-heading'>
                    {/* Chapter filters */}
                    <div key='Chapter-filter' className='flex flex-wrap items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg mb-3'>
                        <div className='text-xs text-gray-700 uppercase bg-gray-50 border-b w-full px-6 py-3'>Filter chapters</div>
                        {chapters.map((chapter: ASVSChapter) => (
                            <div key={chapter.name} className='flex items-center pl-3'>
                                <input
                                    type='checkbox'
                                    id={chapter.name}
                                    className='text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    name={chapter.name}
                                    checked={chapter.checked}
                                    onChange={(e) => {
                                        setChapterCheck(chapter.name)
                                    }}
                                    data-cy='chapter-checkbox'
                                />
                                <label htmlFor={chapter.name} className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>{chapter.name}</label>
                            </div>
                        ))
                        }
                    </div>

                    {/* Level filters */}
                    <div className='flex'>
                        <div className='mr-3 flex flex-wrap items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg mb-3'>
                            <div className='text-xs text-gray-700 uppercase bg-gray-50 border-b w-full px-6 py-3'>Filter levels</div>
                            <div key='level-1-checkbox' className='flex items-center pl-3'>
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
                                <label htmlFor='level-1-checkbox' className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                                    Level 1
                                </label>
                            </div>

                            <div key='level-2-checkbox' className='flex items-center pl-3'>
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
                                <label htmlFor='level-2-checkbox' className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                                    Level 2
                                </label>
                            </div>

                            <div key='level-3-checkbox' className='flex items-center pl-3'>
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
                                <label htmlFor='level-3-checkbox' className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                                    Level 3
                                </label>
                            </div>
                        </div>

                        {/* Incomplete items filter */}
                        <div className='flex flex-wrap items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg mb-3'>
                            <div className='text-xs text-gray-700 uppercase bg-gray-50 border-b w-full px-6 py-3'>Other filters</div>
                            <div key='show-incomplete-only' className='flex items-center pl-3'>
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
                                <label htmlFor='show-incomplete-only' className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                                    Show incomplete only
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ASVSListFilter;
