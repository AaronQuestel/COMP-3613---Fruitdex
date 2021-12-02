import React from "react";
import useFirestore from '../firebasehooks/UseFirestore';

const Images = () =>{
    const { docs } = useFirestore('images');



    return(
        <div className="imgs">
            { docs && docs.map(doc => (
                <div className="img-wrap" key={doc.id}>
                    <img src={doc.url} alt="Fruit Images" />
                </div>
            ))}
        </div>
    )
}
export default Images;