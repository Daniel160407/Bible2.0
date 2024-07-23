import React, { useState } from 'react';
import '../../style/Buttons.scss';

const Buttons = () => {
    const [isHidden, setIsHidden] = useState(false);

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    const onDocumentationClick = () => {
        window.open('/documentation', '_blank');
    };

    const onBibleClick = () => {
        window.open('/bible', '_blank');
    };

    const onOpenPresentViewClick = () => {
        const newWindow = window.open('/presentview', '_blank');
        newWindow.onload = () => {
            newWindow.document.documentElement.requestFullscreen();
        };
    };

    return (
        <div className={`windowButtons`}>
            <div id='hide' className={`${isHidden ? 'hidden' : ''}`} onClick={toggleHidden}>
                <img id='hideButton' src='/images/hide.jpeg' alt="Hide"></img>
            </div>
            <div className={`btns ${isHidden ? 'hidden' : ''}`}>
                <button onClick={onDocumentationClick} className='documentationBtn'>Documentation</button>
                <button onClick={onBibleClick} className='bibleBtn'>Bible</button>
                <button onClick={onOpenPresentViewClick} className="button-85" role="button">Open Present View</button>
            </div>
            <div className='madeBy'>
                <p>Made By <a href='https://portfoliodanielabulashvili.netlify.app/' target='_blank' rel='noopener noreferrer'>Daniel</a></p>
            </div>
        </div>
    );
}

export default Buttons;
