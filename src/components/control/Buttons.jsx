import React from 'react'
import ReactDOM from 'react-dom/client'
import Documentation from "../Documentation";
import Bible from '../Bible';
import PresentView from '../projector/PresentView';

const Buttons = () => {
    const onDocumentationClick = () => {
        const documentationTab = window.open();
        documentationTab.document.write('<div id="root"></div>');
        documentationTab.document.title = 'Documentation';
        ReactDOM.createRoot(documentationTab.document.getElementById('root')).render(
            <React.StrictMode>
                <Documentation/>
            </React.StrictMode>
        );
    }

    const onBibleClick = () => {
        const bibleTab = window.open();
        bibleTab.document.write('<div id="root"></div>');
        bibleTab.document.title = 'Bible';
        ReactDOM.createRoot(bibleTab.document.getElementById('root')).render(
            <React.StrictMode>
                <Bible/>
            </React.StrictMode>
        );
    }

    const onOpenPresentViewClick = () => {
        const presentViewTab = window.open();
        presentViewTab.document.write('<div id="root"></div>');
        presentViewTab.document.title = 'Present View';
        ReactDOM.createRoot(presentViewTab.document.getElementById('root')).render(
            <React.StrictMode>
                <PresentView/>
            </React.StrictMode>
        );
    }

    return (
        <div className="buttons">
            <button onClick={onDocumentationClick}>Documentation</button>
            <button onClick={onBibleClick}>Bible</button>
            <button onClick={onOpenPresentViewClick}>Open Present View</button>
        </div>
    );
}

export default Buttons;