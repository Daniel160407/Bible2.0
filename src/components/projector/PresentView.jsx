import { useState, useEffect } from "react";
import '../../style/PresentView.scss';

const PresentView = () => {
    const [versesToDisplay, setVersesToDisplay] = useState([]);
    const [show, setShow] = useState(false);
    const [fontSize, setFontSize] = useState(null);
    const channel = new BroadcastChannel('projectorData');

    useEffect(() => {
        document.body.style.color = '#f4f4f4';
        document.body.style.backgroundImage = 'url(/backgrounds/16.jpeg)';

        channel.onmessage = event => {
            const data = event.data;

            if (data.background) {
                document.body.style.backgroundImage = `url(${data.background})`;
            } else if (data.font) {
                document.body.style.fontFamily = data.font;
            } else if (data.textColor) {
                document.body.style.color = data.textColor;
            } else {
                if (data.show === false) {
                    setShow(false);
                } else {
                    if (!data.versesToDisplay) {
                        if (data.fontSize === true) {
                            adjustFontSize();
                        } else {
                            setFontSize(data.fontSize);
                        }
                    } else {
                        setVersesToDisplay(data.versesToDisplay || []);
                        setShow(data.show);

                        if (data.fontSize === true) {
                            adjustFontSize();
                        } else {
                            setFontSize(data.fontSize);
                        }
                    }
                }
            }
        };
    }, []);

    const adjustFontSize = () => {
        const versesDiv = document.getElementById('verses');
        for (let i = 0; i < 200; i+=10) {
            versesDiv.style.fontSize = `${i}px`;
            if (versesDiv.offsetHeight > window.innerHeight) {
                console.log(versesDiv.offsetHeight);
                console.log(window.innerHeight);
                console.log(versesDiv.offsetHeight > window.innerHeight);
                console.log(i);

                setFontSize(i);
                break;
            }
        }
    };

    useEffect(() => {
        if (fontSize !== null) {
            const verses = document.getElementsByClassName('verse-text');
            Array.from(verses).forEach(verse => {
                verse.style.fontSize = `${fontSize}px`;
            });

            const references = document.getElementsByClassName('verse-reference');
            Array.from(references).forEach(reference => {
                reference.style.fontSize = `${fontSize}px`;
            });
        }
    }, [versesToDisplay, fontSize]);

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
                <br />
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
                <br />
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
