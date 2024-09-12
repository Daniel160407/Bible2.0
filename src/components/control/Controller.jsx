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
    const [uaBooks, setUaBooks] = useState([]);
    const [frBooks, setFrBooks] = useState([]);
    const [grBooks, setGrBooks] = useState([]);
    const [trBooks, setTrBooks] = useState([]);
    const [esBooks, setEsBooks] = useState([]);

    const [background, setBackground] = useState('/backgrounds/16.jpeg');

    useEffect(() => {
        const fetchBooks = async (language, setBooks) => {
            try {
                const response = await axios.get(`https://holybible.ge/service.php?w=&t=&m=&s=&mv=&language=${language}&page=1`);
                setBooks(response.data.bibleNames);
            } catch (error) {
                console.error(`Failed to fetch ${language} books`, error);
            }
        };

        fetchBooks('geo', setGeoBooks);
        fetchBooks('eng', setEngBooks);
        fetchBooks('russian', setRusBooks);
        fetchBooks('ukrainian', setUaBooks);
        fetchBooks('french', setFrBooks);
        fetchBooks('greek', setGrBooks);
        fetchBooks('turkish', setTrBooks);
        fetchBooks('spanish', setEsBooks);
    }, []);

    useEffect(() => {
        channel.postMessage({ font });
    }, [font]);

    useEffect(() => {
        channel.postMessage({ fontSize, show: true });
    }, [fontSize]);

    useEffect(() => {
        channel.postMessage({ textColor });
    }, [textColor]);

    useEffect(() => {
        channel.postMessage({ background });
    }, [background]);

    useEffect(() => {
        if (show) {
            const fetchVerses = async (language, version, books, setVerses) => {
                try {
                    console.log("ssssssssssssssssss: "+separatedVerse);
                    const response = await axios.get(`https://holybible.ge/service.php?w=${separatedVerse ? versesToDisplay.bookIndex + 1 : versesToDisplay.bookIndex}&t=${separatedVerse ? separatedVerse.tavi : versesToDisplay.chapter}&m=&s=&mv=${version}&language=${language}&page=1`);
                    const bibleData = response.data.bibleData;
                    let bv = [];

                    if (!separatedVerse) {
                        if (versesToDisplay.till !== null) {
                            for (let i = versesToDisplay.verse - 1; i <= versesToDisplay.till - 1; i++) {
                                bv.push(bibleData[i]);
                            }
                        } else {
                            bv.push(bibleData[versesToDisplay.verse - 1]);
                        }
                        setVerses({
                            book: books[versesToDisplay.bookIndex - 1],
                            chapter: versesToDisplay.chapter,
                            verse: versesToDisplay.verse,
                            till: versesToDisplay.till,
                            bv,
                        });
                    } else {
                        for (let i = 0; i < bibleData.length; i++) {
                            if (bibleData[i].tavi === separatedVerse.tavi && bibleData[i].muxli === separatedVerse.muxli) {
                                bv.push(bibleData[i]);
                            }
                        }
                        setVerses({
                            book: books[versesToDisplay.bookIndex],
                            chapter: separatedVerse.tavi,
                            verse: separatedVerse.muxli,
                            till: null,
                            bv,
                        });
                    }
                } catch (error) {
                    console.error(`Failed to fetch ${language} verses`, error);
                }
            };

            const verses = {};
            const setVerses = (lang, versesData) => {
                verses[lang] = versesData;
                channel.postMessage({ versesToDisplay: verses, fontSize, show });
                setShow(false);
            };

            languages.geo && fetchVerses('geo', versions.geo, geoBooks, data => setVerses('geo', data));
            languages.eng && fetchVerses('eng', versions.eng, engBooks, data => setVerses('eng', data));
            languages.rus && fetchVerses('russian', versions.rus, rusBooks, data => setVerses('rus', data));
            languages.ua && fetchVerses('ukrainian', versions.ua, uaBooks, data => setVerses('ua', data));
            languages.fr && fetchVerses('french', versions.fr, frBooks, data => setVerses('fr', data));
            languages.gr && fetchVerses('greek', versions.gr, grBooks, data => setVerses('gr', data));
            languages.tr && fetchVerses('turkish', versions.tr, trBooks, data => setVerses('tr', data));
            languages.es && fetchVerses('spanish', versions.es, esBooks, data => setVerses('es', data));
        }
    }, [show]);

    useEffect(() => {
        if (clear) {
            channel.postMessage({ show });
            setClear(false);
        }
    }, [clear]);

    return (
        <>
            <div id="control">
                <ProjectorController
                    setShow={setShow}
                    setClear={setClear}
                    setVersions={setVersions}
                    setLanguages={setLanguages}
                    setFontSize={setFontSize}
                    fontSize={fontSize}
                    setFont={setFont}
                    font={font}
                    setTextColor={setTextColor}
                    textColor={textColor}
                />
                <BackgroundController setBackground={setBackground} />
            </div>
            <Buttons />
        </>
    );
};

export default Controller;
