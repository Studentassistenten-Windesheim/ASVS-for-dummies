import React, { useState, useEffect } from 'react';

interface NotesSectionProps {
    pageId: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ pageId }) => {
    const [notes, setNotes] = useState<string[]>([]);
    const [editableNote, setEditableNote] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        // Load notes from local storage only if the state is empty
        if (notes.length === 0) {
            const storedNotes = localStorage.getItem(`notes_${pageId}`);
            if (storedNotes) {
                const parsedNotes = JSON.parse(storedNotes);
                if (parsedNotes.length > 0) {
                    setNotes(parsedNotes);
                }
            }
        }
    }, [notes.length]); // Only run the effect if notes.length changes


    useEffect(() => {
        localStorage.setItem(`notes_${pageId}`, JSON.stringify(notes));
    }, [notes, pageId]);

    const handleAddOrUpdateNote = () => {
        if (editableNote.trim() !== '') {
            if (editIndex !== undefined) {
                setNotes((prevNotes) => {
                    const updatedNotes = [...prevNotes];
                    updatedNotes[editIndex] = editableNote;
                    return updatedNotes;
                });
                setEditIndex(undefined);
            } else {
                setNotes((prevNotes) => [...prevNotes, editableNote]);
            }
            setEditableNote('');
        }
    };

    const handleEditNote = (index: number) => {
        setEditableNote(notes[index]);
        setEditIndex(index);
    };

    //const handleDeleteNote = (index: number) => {
    //    setNotes((prevNotes) => {
    //        const updatedNotes = [...prevNotes];
    //        updatedNotes.splice(index, 1);
    //        return updatedNotes;
    //    });
    //    setEditIndex(null);
    //};

    const handleDeleteNote = (index: number) => {
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes];
            updatedNotes.splice(index, 1);

            // Check if there are no remaining notes, reset to an empty array
            if (updatedNotes.length === 0) {
                return [];
            }

            return updatedNotes;
        });
        setEditIndex(undefined);
    };


    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Notes</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    className="border border-gray-300 p-2 w-full"
                    placeholder="Add or edit a note..."
                    value={editableNote}
                    onChange={(e) => setEditableNote(e.target.value)}
                />
                <button
                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                    onClick={handleAddOrUpdateNote}
                >
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            <ul>
                {notes.map((note, index) => (
                    <li key={index} className="border-b border-gray-300 py-2">
                        {note}
                        <button
                            className="ml-2 text-red-500"
                            onClick={() => handleDeleteNote(index)}
                        >
                            Delete
                        </button>
                        <button
                            className="ml-2 text-blue-500"
                            onClick={() => handleEditNote(index)}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesSection;
