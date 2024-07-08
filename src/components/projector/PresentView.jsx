import { useState, useEffect } from "react";
import '../../style/PresentView.scss';

const PresentView = () => {
    const [versesToDisplay, setVersesToDisplay] = useState([]);
    const [show, setShow] = useState(false);
    const channel = new BroadcastChannel('projectorData');

    useEffect(() => {
        channel.onmessage = event => {
            const data = event.data;
            console.log(data.versesToDisplay)
            setVersesToDisplay(data.versesToDisplay || []);
            setShow(data.show);
        };
    }, []);

    return (
        <div id="present-view">
            <div id="verses">
                {show && versesToDisplay.geo && versesToDisplay.geo.bv.length > 0 && (
                    versesToDisplay.geo.bv.map(verse => (
                        <div key={verse.id} className="verse">
                            <h1 className="verse-text">{verse.bv}</h1>
                        </div>
                    ))
                )}
                {show && versesToDisplay.geo && versesToDisplay.geo.bv.length > 0 && (
                    <h1 className="verse-reference">{versesToDisplay.geo.book} {versesToDisplay.geo.chapter}:{versesToDisplay.geo.verse}{versesToDisplay.geo.till !== null ? '-' + versesToDisplay.geo.till : ''}</h1>
                )}
                <br/>
                {show && versesToDisplay.eng && versesToDisplay.eng.bv.length > 0 && (
                    versesToDisplay.eng.bv.map(verse => (
                        <div key={verse.id} className="verse">
                            <h1 className="verse-text">{verse.bv}</h1>
                        </div>
                    ))
                )}
                {show && versesToDisplay.eng && versesToDisplay.eng.bv.length > 0 && (
                    <h1 className="verse-reference">{versesToDisplay.eng.book} {versesToDisplay.eng.chapter}:{versesToDisplay.eng.verse}{versesToDisplay.eng.till !== null ? '-' + versesToDisplay.eng.till : ''}</h1>
                )}
                <br/>
                {show && versesToDisplay.rus && versesToDisplay.rus.bv.length > 0 && (
                    versesToDisplay.rus.bv.map(verse => (
                        <div key={verse.id} className="verse">
                            <h1 className="verse-text">{verse.bv}</h1>
                        </div>
                    ))
                )}
                {show && versesToDisplay.rus && versesToDisplay.rus.bv.length > 0 && (
                    <h1 className="verse-reference">{versesToDisplay.rus.book} {versesToDisplay.rus.chapter}:{versesToDisplay.rus.verse}{versesToDisplay.rus.till !== null ? '-' + versesToDisplay.rus.till : ''}</h1>
                )}
            </div>
        </div>
    );
}

export default PresentView;
