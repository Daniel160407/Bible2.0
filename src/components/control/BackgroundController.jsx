import React from 'react';
import '../../style/BackgroundController.scss';

const BackgroundController = ({ setBackground }) => {
    const handleBackgroundChange = (e) => {
        
    };

    const elements = [];
    for (let i = 1; i <= 20; i++) {
        elements.push(
            <div key={i} className="background-item">
                <input type="radio" value={`/backgrounds/${i}.jpeg`} name="background" onChange={(e) => setBackground(e.target.value)}></input>
                <img src={`/backgrounds/${i}.jpeg`} alt={`Background ${i}`}></img>
            </div>
        );
    }

    return (
        <div className="background-controller">
            {elements}
        </div>
    );
}

export default BackgroundController;
