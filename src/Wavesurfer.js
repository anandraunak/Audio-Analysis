import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "./Wavesurfer.css";

const formWaveSurferOptions = (ref) => ({
    container: ref,
    wavecolor: "lightgray",
    progressColor: "black",
    cursorColor: "OrangedRed",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    normalize: true,
    partialRender: true,

});

export default function Waveform({ url }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [noteText, setNoteText] = useState("");
    const [note, addNote] = useState([]);

    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load("https://safe-chamber-04303.herokuapp.com/" + url);

        wavesurfer.current.on("ready", function () {
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
            }
        })
        return () => wavesurfer.current.destroy();
    }, [url]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    }

    const onVolumeChange = (e) => {
        const { target } = e;
        const newVolume = +target.value;

        if (newVolume) {
            setVolume(newVolume);
            wavesurfer.current.setVolume(newVolume || 1);
        }

    };


    return (
        <div className="god">
            <div className="waveform" ref={waveformRef} />
            <div className="controls">
                <button
                    style={{
                        color: 'white',
                        backgroundColor: 'black',
                        marginTop: '75px',
                        marginLeft: '20px',
                        marginBottom: '50px',
                        fontSize: 'medium',
                        opacity: '100%;',
                        borderRadius: '0.7rem',
                        fontFamily: 'Raleway,sans-serif',
                        padding: '20px 30px 20px 30px',
                        transition: 'box-shadow 300ms ease-in-out, color 300ms ease-in-out'
                    }}
                    className="playButton" onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
                <input className="slider"
                    type="range"
                    id="volume"
                    name="volume"
                    min="0.01"
                    max="1"
                    step="0.01"

                    onChange={onVolumeChange}
                    defaultValue={volume}
                />
                <label htmlFor="volume">Volume</label>
            </div>
            <div className="addnotesSection">
                <input className="noteInput"
                    placeholder="Add note.."
                    type="text"
                    value={noteText}
                    onChange={(e) => {
                        setNoteText(e.target.value);
                    }}
                ></input>
                <br />
                <button
                    style={{
                        color: 'white',
                        backgroundColor: 'black',
                        marginTop: '75px',
                        marginLeft: '20px',
                        marginBottom: '50px',
                        fontSize: 'medium',
                        opacity: '100%;',
                        borderRadius: '0.7rem',
                        fontFamily: 'Raleway,sans-serif',
                        padding: '20px 30px 20px 30px',
                        transition: 'box-shadow 300ms ease-in-out, color 300ms ease-in-out'
                    }}
                    className="addNoteButton"
                    onClick={() => {
                        console.log(wavesurfer.current.getCurrentTime());
                        wavesurfer.current.play();
                        addNote((notes) => [
                            ...notes,
                            {
                                text: noteText,
                                timeStamp: wavesurfer.current.getCurrentTime(),
                            },
                        ]);
                        console.log(note);
                    }}
                > Add note</button>
            </div>
            <div className="NotesSection">
                {note === null ? (
                    <h1>no notes available</h1>
                ) : (
                    note.map((items) => {
                        return (
                            <div
                                key={items.timeStamp}
                                onClick={() => {
                                    wavesurfer.current.play(items.timeStamp);
                                }}
                            >
                                <h2>{items.text}</h2>
                                <h3>{items.timeStamp}</h3>
                            </div>
                        )
                    })

                )}

            </div>
            <div className="wrapper" />
        </div>

    );
}