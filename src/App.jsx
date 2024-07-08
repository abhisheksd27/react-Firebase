// App.js

import React, { useEffect, useState } from 'react';
import Authentication from './components/Authentication';
import FileUpload from './components/FileUpload';
import auth, { db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, 'movies');

  // Read
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  // Create
  const [movie, setMovie] = useState('');
  const [year, setYear] = useState(0);
  const [receivedAnOscar, setReceivedAnOscar] = useState(false);

  const addMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movie,
        ReleaseDate: year,
        receivedAnOscar: receivedAnOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete
  const deleteMovie = async (id) => {
    try {
      const deleteMovie = doc(db, 'movies', id);
      await deleteDoc(deleteMovie);
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  // Update
  const [updateTitle, setUpdatedTitle] = useState('');

  const update = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await updateDoc(movieDoc, {
        title: updateTitle,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      Firebase course
      <Authentication />
      <br />
      <div>
        <input
          placeholder='Movie Title...'
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          placeholder='Release date...'
          type='number'
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <label>Received Oscar</label>
        <input
          type='checkbox'
          checked={receivedAnOscar}
          onChange={(e) => setReceivedAnOscar(e.target.checked)}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>
              {movie.title}
            </h1>
            <p>Date: {movie.ReleaseDate}</p>
            <p>Received Oscar: {movie.receivedAnOscar ? 'Yes' : 'No'}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input
              placeholder='New Title...'
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => update(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <br />

      <FileUpload />
    </div>
  );
};

export default App;
