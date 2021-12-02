import React, { useState } from 'react'
import Progress from './Progress';

const UploadForm = () =>{
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const typesOfAllowedFiles = ['image/png', 'image/jpeg'];
    const changeHandler = (event) => {
        let imageSelected = event.target.files[0];
        if (imageSelected && typesOfAllowedFiles.includes(imageSelected.type) ) {
            setFile(imageSelected);
            setError('');
        } else {
            //if upload is invalid reset sate back to null
            setFile(null);
            setError('Please select correct image file (png or jpeg)');
        }
    }
    //conditional rendering
    return(
        <form>
            <input type="file" onChange={changeHandler} />
            
            <div className="output">
                { error && <div className="error">{ error }</div> }
                { file && <div>{ file.name }</div> }
                { file && <Progress file={file} setFile={setFile} /> }
            </div>
        </form>
    )
}
export default UploadForm;