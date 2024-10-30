import React, { useEffect } from 'react';
import { NotesData } from '../context/notesContext'; // Adjust the path as necessary
import NotesCard from '../components/notesCard'; // Adjust the path as necessary
import { FaBook } from "react-icons/fa";

const NotesStore = () => {
  const { notes, fetchNotes } = NotesData();

  useEffect(() => {
    fetchNotes(); // Fetch notes when component mounts
  }, [fetchNotes]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-blue1">
     
      <main className="flex-1 py-28 px-4 lg:px-28">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">नोट्स स्टोर</h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
              Discover our collection of notes and explore a wealth of information at your fingertips. Access and read your favorite notes instantly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">All Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {notes.length === 0 ? (
                <p className="col-span-full text-center text-gray-700">No notes available</p>
              ) : (
                notes.map(note => (
                  <NotesCard key={note._id} note={note} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotesStore;
