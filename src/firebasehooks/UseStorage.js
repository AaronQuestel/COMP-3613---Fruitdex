import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const UseStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    //The fires everytime the file dependency changes
    //
    useEffect(() => {
        //references where file should be saved
        const storageRef = projectStorage.ref(file.name);
        //make reference to collection we want to save the document to
        //we use projectFirestore to interact with the database
        //It doesn't matter if the collection isn't made, if it doesn't exist firebase makes ti for us
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) =>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            //save to firestore
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url: url, createdAt });
            setUrl(url);
        })
    }, [file]);

    return { progress, url, error }
}

export default UseStorage;