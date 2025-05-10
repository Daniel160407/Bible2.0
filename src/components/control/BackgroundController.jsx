import React, { useState } from 'react';
import '../../style/BackgroundController.scss';

const BackgroundController = ({ setBackground }) => {
    const [specificBackground, setSpecificBackground] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const elements = [];
    for (let i = 1; i <= 20; i++) {
        elements.push(
            <label key={i} className="background-item">
                <input type="radio" value={`/backgrounds/${i}.jpeg`} name="background" onChange={(e) => setBackground(e.target.value)}></input>
                <img src={`/backgrounds/${i}.jpeg`} alt={`Background ${i}`}></img>
            </label>
        );
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setSpecificBackground(fileURL);
            setBackground(fileURL);
        }
    };

    return (
        <div className="background-controller">
            {elements}
            <div className='specific-background'>
                <input type='radio' name='background' value={imageUrl} onChange={(e) => setBackground(e.target.value)}></input>
                <input type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}></input>
                <input type='radio' name='background' value={specificBackground} onChange={(e) => setBackground(e.target.value)}></input>
                <input type='file' onChange={handleFileChange}></input>
            </div>
        </div>
    );
}

export default BackgroundController;
