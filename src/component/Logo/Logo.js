import React from 'react';
import Tilt from 'react-tilt';
import brain from './facerecognitionlogo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-3" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img  src={brain} alt="Logo"/> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;