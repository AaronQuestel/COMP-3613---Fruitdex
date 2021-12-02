import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const UseFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    //callback function that fires whenever the dependencies change
    //dependencies -> collection
    useEffect(() => {
        //use projectFirstore to reach into collection
        //onSnapshot -> this method fires a callback function everytime a change occurs inside the collection
        //onSnapshot -> takes in a snapshot object
        const unsub = projectFirestore.collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    //push data from doc into the documents array
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            });
        return () => unsub();

    }, [collection])



    return { docs };
}

export default UseFirestore;