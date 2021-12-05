import React from "react";
import Waveform from "../Wavesurfer.js";
import { useLocation } from "react-router-dom";

function Editor() {
    let location = useLocation();
    const audioUrl = location.state;
    return(
        <div>
        <Waveform url={audioUrl} />
        
        

        
        </div>
    );
    
}
export default Editor;