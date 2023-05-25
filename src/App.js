import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { async } from '@firebase/util';
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";


function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [newOscarNom, setNewOscarNom] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    //Read Data
    //Set movie list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
       ...doc.data(),
       id: doc.id,
    }));
    setMovieList(filteredData);
    console.log(filteredData);
    } catch (err) {
      console.error(err)
    }
  };

  const deleteMovie = async (id) => 
  {
    try {
      
      const movieDoc = doc(db, "movies",id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      
      const movieDoc = doc(db, "movies",id);
      await updateDoc(movieDoc,{title: updatedTitle});
      getMovieList();
    } catch (error) {
      
    }

  };

  useEffect(() => {
    getMovieList();

  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        oscarNom: newOscarNom,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) 
    {
      console.error(err)
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage,'projectFiles/${fileUpload.name}');
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error); 
    }
    
  };


  return (
    <div className="App">
        <Auth />

        <div>
          <input
           placeholder="Movie title..."
           onChange={(e) => setNewMovieTitle(e.target.value)}
           />
           <input
           placeholder="Release Date..."
           type="number"
           onChange={(e) => setNewReleaseDate(Number(e.target.value))}
           />
           <input
           placeholder="Oscar Nominated?..."
           type="checkbox"
           checked={newOscarNom}
           onChange={(e) => setNewOscarNom(e.target.checked)}
           />

           <label>Oscar Nominated?</label>
           <button
            onClick={onSubmitMovie}
            >
              Submit Movie
           </button>
        </div>
        <div>
          <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button onClick={uploadFile}>Upload File</button>
        </div>
        <div>
          {movieList.map((movie) => (
            <div>
              <h1
               style={{color: movie.oscarNom ? "green" : "red"
               }}>
                {" "}
                {movie.title}{" "}
              </h1>
              <p> Date: {movie.releaseDate} </p>
              <button onClick={() => deleteMovie(movie.id)}> Delete Movie </button>

              <input
              placeholder='new title...'
              onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button
              onClick={() => updateMovieTitle(movie.id)}
              >
                Update Title
              </button>


            </div>

          ))}
        </div>

    </div>
  );
}

export default App;
