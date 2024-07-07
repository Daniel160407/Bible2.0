import { useState, useEffect } from "react";
import '../../style/PresentView.scss';

const PresentView = () => {
    const [versesToDisplay, setVersesToDisplay] = useState([]);
    const [booksToDisplay, setBooksToDisplay] = useState([]);
    const [show, setShow] = useState(false);
    const channel = new BroadcastChannel('projectorData');

    useEffect(() => {
        channel.onmessage = event => {
            const data = event.data;
            setVersesToDisplay(data.versesToDisplay || []);
            setBooksToDisplay(data.booksToDisplay || []);
            setShow(data.show);
        };
    }, []);

    return (
        <div id="present-view">
            {show && versesToDisplay.length > 0 && (
                versesToDisplay.map(verse => (
                    <div key={verse.id} className="verse">
                        <h1 className="verse-text">{verse.bv}</h1>
                        <h1 className="verse-reference">{booksToDisplay} {verse.tavi}:{verse.muxli}</h1>
                    </div>
                ))
            )}
        </div>
    );
}

export default PresentView;
