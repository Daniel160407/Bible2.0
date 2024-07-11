import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import ProjectorController from "../projector/ProjectorController";
import axios from "axios";
import BackgroundController from "./BackgroundController";

const Controller = ({ versesToDisplay, separatedVerse }) => {
    const [show, setShow] = useState(false);
    const [clear, setClear] = useState(false);
    const channel = new BroadcastChannel('projectorData');

    const [languages, setLanguages] = useState({});
    const [versions, setVersions] = useState({});

    const [fontSize, setFontSize] = useState(7);
    const [font, setFont] = useState('Banner');
    const [textColor, setTextColor] = useState('white');

    const [geoBooks, setGeoBooks] = useState([]);
    const [engBooks, setEngBooks] = useState([]);
    const [rusBooks, setRusBooks] = useState([]);

    const [background, setBackground] = useState('/backgrounds/16.jpeg');

    useEffect(() => {
        axios.get('https://holybible.ge/service.php?w=&t=&m=&s=&mv=&language=geo&page=1')
            .then(response => {
                setGeoBooks(response.data.bibleNames);
            });

        axios.get('https://holybible.ge/service.php?w=&t=&m=&s=&mv=&language=eng&page=1')
            .then(response => {
                setEngBooks(response.data.bibleNames);
            });

        axios.get('https://holybible.ge/service.php?w=&t=&m=&s=&mv=&language=russian&page=1')
            .then(response => {
                setRusBooks(response.data.bibleNames);
            });
    }, []);

    useEffect(() => {
        channel.postMessage({
            font: font
        });
    }, [font]);

    useEffect(() => {
        channel.postMessage({
            fontSize: fontSize,
            show: true
        });
    }, [fontSize]);

    useEffect(() => {
        channel.postMessage({
            textColor: textColor
        });
    }, [textColor]);

    useEffect(() => {
        channel.postMessage({
            background: background
        });
    }, [background]);

    useEffect(() => {
        if (show) {
            const verses = {};

            if (languages.geo) {
                axios.get(`https://holybible.ge/service.php?w=${separatedVerse ? versesToDisplay.bookIndex + 1 : versesToDisplay.bookIndex}&t=${separatedVerse ? separatedVerse.tavi : versesToDisplay.chapter}&m=&s=&mv=${versions.geo}&language=geo&page=1`)
                    .then(response => {
                        let bv = [];

                        if (!separatedVerse) {
                            if (versesToDisplay.till !== null) {
                                for (let i = versesToDisplay.verse - 1; i <= versesToDisplay.till - 1; i++) {
                                    bv.push(response.data.bibleData[i]);
                                }
                            } else {
                                bv.push(response.data.bibleData[versesToDisplay.verse - 1]);
                            }

                            verses.geo = {
                                book: geoBooks[versesToDisplay.bookIndex - 1],
                                chapter: versesToDisplay.chapter,
                                verse: versesToDisplay.verse,
                                till: versesToDisplay.till,
                                bv: bv
                            };

                        } else {
                            const bibleData = response.data.bibleData;
                            for (let i = 0; i < bibleData.length; i++) {
                                if (bibleData[i].tavi === separatedVerse.tavi && bibleData[i].muxli === separatedVerse.muxli) {
                                    bv.push(bibleData[i]);
                                }
                            }

                            verses.geo = {
                                book: geoBooks[versesToDisplay.bookIndex],
                                chapter: separatedVerse.tavi,
                                verse: separatedVerse.muxli,
                                till: null,
                                bv: bv
                            };
                        }

                        channel.postMessage({
                            versesToDisplay: verses,
                            fontSize: fontSize,
                            show: show
                        });
                        setShow(false);
                    });
            }

            if (languages.eng) {
                axios.get(`https://holybible.ge/service.php?w=${separatedVerse ? versesToDisplay.bookIndex + 1 : versesToDisplay.bookIndex}&t=${separatedVerse ? separatedVerse.tavi : versesToDisplay.chapter}&m=&s=&mv=${versions.eng}&language=eng&page=1`)
                    .then(response => {
                        let bv = [];

                        if (!separatedVerse) {
                            if (versesToDisplay.till !== null) {
                                for (let i = versesToDisplay.verse - 1; i <= versesToDisplay.till - 1; i++) {
                                    bv.push(response.data.bibleData[i]);
                                }
                            } else {
                                bv.push(response.data.bibleData[versesToDisplay.verse - 1]);
                            }

                            verses.eng = {
                                book: engBooks[versesToDisplay.bookIndex - 1],
                                chapter: versesToDisplay.chapter,
                                verse: versesToDisplay.verse,
                                till: versesToDisplay.till,
                                bv: bv
                            };

                        } else {
                            const bibleData = response.data.bibleData;
                            for (let i = 0; i < bibleData.length; i++) {
                                if (bibleData[i].tavi === separatedVerse.tavi && bibleData[i].muxli === separatedVerse.muxli) {
                                    bv.push(bibleData[i]);
                                }
                            }

                            verses.eng = {
                                book: engBooks[versesToDisplay.bookIndex],
                                chapter: separatedVerse.tavi,
                                verse: separatedVerse.muxli,
                                till: null,
                                bv: bv
                            };
                        }

                        channel.postMessage({
                            versesToDisplay: verses,
                            fontSize: fontSize,
                            show: show
                        });
                        setShow(false);
                    });
            }

            if (languages.rus) {
                axios.get(`https://holybible.ge/service.php?w=${separatedVerse ? versesToDisplay.bookIndex + 1 : versesToDisplay.bookIndex}&t=${separatedVerse ? separatedVerse.tavi : versesToDisplay.chapter}&m=&s=&mv=${versions.rus}&language=russian&page=1`)
                    .then(response => {
                        let bv = [];

                        if (!separatedVerse) {
                            if (versesToDisplay.till !== null) {
                                for (let i = versesToDisplay.verse - 1; i <= versesToDisplay.till - 1; i++) {
                                    bv.push(response.data.bibleData[i]);
                                }
                            } else {
                                bv.push(response.data.bibleData[versesToDisplay.verse - 1]);
                            }

                            verses.rus = {
                                book: rusBooks[versesToDisplay.bookIndex - 1],
                                chapter: versesToDisplay.chapter,
                                verse: versesToDisplay.verse,
                                till: versesToDisplay.till,
                                bv: bv
                            };

                        } else {
                            const bibleData = response.data.bibleData;
                            for (let i = 0; i < bibleData.length; i++) {
                                if (bibleData[i].tavi === separatedVerse.tavi && bibleData[i].muxli === separatedVerse.muxli) {
                                    bv.push(bibleData[i]);
                                }
                            }

                            verses.rus = {
                                book: rusBooks[versesToDisplay.bookIndex],
                                chapter: separatedVerse.tavi,
                                verse: separatedVerse.muxli,
                                till: null,
                                bv: bv
                            };
                        }

                        channel.postMessage({
                            versesToDisplay: verses,
                            fontSize: fontSize,
                            show: show
                        });
                        setShow(false);
                    });
            }
        }
    }, [show]);

    useEffect(() => {
        if (clear) {
            channel.postMessage({ show: show });
            setClear(false);
        }
    }, [clear]);

    return (
        <>
            <div id="control">
                <ProjectorController setShow={setShow} setClear={setClear} setVersions={setVersions} 
                    setLanguages={setLanguages} setFontSize={setFontSize} 
                    fontSize={fontSize} setFont={setFont} font={font} setTextColor={setTextColor} textColor={textColor} />
                <BackgroundController setBackground={setBackground} />
            </div>
            <Buttons />
        </>
    );
}

export default Controller;
