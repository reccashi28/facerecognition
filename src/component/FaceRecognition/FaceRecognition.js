import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center mt5">
            <div className="absolute mt2">
                <img src={imageUrl} alt="Pictures" width="900px" height="auto"/>
            </div>
        </div>
    )
}

export default FaceRecognition;