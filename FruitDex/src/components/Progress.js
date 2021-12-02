import React, { useEffect } from 'react'
import useStorage from '../firebasehooks/UseStorage'

const Progress = ({ file, setFile }) => {
    //useStorage is the function from the UseStorage.js file
    const { url, progress } = useStorage(file);

    //this handles when the url value changes
    //if we have a valid value for url setFile(null)
    //Once we have the url it takes the progress bar off
    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile])
    return(
        <div className="progress" style={{ width: progress + '%'}}>
        </div>
    )
}

export default Progress;