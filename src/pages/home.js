import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { uploadBytesResumable } from "firebase/storage";
import { storage } from '../Firebase';
import { BsFillCloudUploadFill } from "react-icons/bs"


function Home() {
    const [audio, setAudio] = useState("");
    let navigate = useNavigate();


    async function HandleSubmit(e) {
        e.preventDefault();
        const audioStorage = storage.getStorage();
        const audioRef = storage.ref(audioStorage, audio.name);
        const upload = uploadBytesResumable(audioRef, audio);


        upload.on(
            "state_changed",
            (snapshot) => {
                const status = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(status + "% uploaded");

                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;

                }
            }, (error) => {
                console.log(error);
            }, () => {
                storage.getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    navigate("/editPage", { state: downloadURL });

                });



            }
        )




    }

    return (
        <div className="homepage">

            <div className="header">
                <h1 className="heading">Audio Analysis</h1>
            </div>
            <form className="body" onSubmit={HandleSubmit}>
                <BsFillCloudUploadFill size="5em" color="black" className="icon" />
                <br />

                <label className="customUpload" >
                    <input  type="file" className="input" onChange={(e) => { setAudio(e.target.files[0]); }} />
                </label>

                <br />





                <button  
                style={{
          color: 'white',
          backgroundColor:'black' ,
          marginTop: '75px',
          marginLeft: '20px',
          marginBottom: '50px',
          fontSize: 'medium',
          opacity: '100%;',
          borderRadius: '0.7rem',
          fontFamily: 'Raleway,sans-serif',
          padding: '20px 30px 20px 30px',
          transition: 'box-shadow 300ms ease-in-out, color 300ms ease-in-out'}}
          
          type="submit"  className="submitButton"> Upload</button>






            </form>
            <div className="Wrapper">

            </div>





        </div>
    )
}

export default Home;
