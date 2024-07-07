import React from 'react';
import ReactDOM from 'react-dom/client';
import Documentation from '../Documentation';
import Bible from '../Bible';
import PresentView from '../projector/PresentView';
import '../../style/Buttons.scss';

const Buttons = () => {
    const openNewTab = (url, title, Component) => {
        const newTab = window.open(url);
        newTab.document.title = title;
        ReactDOM.createRoot(newTab.document.getElementById('root')).render(
            <React.StrictMode>
                <Component />
            </React.StrictMode>
        );
    }

    const onDocumentationClick = () => {
        openNewTab('/documentation', 'Documentation', Documentation);
    }

    const onBibleClick = () => {
        openNewTab('/bible', 'Bible', Bible);
    }

    const onOpenPresentViewClick = () => {
        openNewTab('/presentview', 'Present View', PresentView);
    }

    return (
        <div className="windowButtons">
            <div className='btns'>
                <button onClick={onDocumentationClick} className='documentationBtn'>Documentation</button>
                <button onClick={onBibleClick} className='bibleBtn'>Bible</button>
                <button onClick={onOpenPresentViewClick} className="button-85" role="button">Open Present View</button>
            </div>
            <div className='madeBy'>
                <p>Made By <a href='https://portfoliodanielabulashvili.netlify.app/' target='_blank'>Daniel</a></p>
            </div>
        </div>
    );
}

export default Buttons;
