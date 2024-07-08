import React from 'react';
import Documentation from '../Documentation';
import Bible from '../Bible';
import PresentView from '../projector/PresentView';
import '../../style/Buttons.scss';

const Buttons = () => {
    const onDocumentationClick = () => {
        window.open('/documentation', '_blank');
    }

    const onBibleClick = () => {
        window.open('/bible', '_blank');
    }

    const onOpenPresentViewClick = () => {
        window.open('/presentview', '_blank');
    }

    return (
        <div className="windowButtons">
            <div className='btns'>
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
