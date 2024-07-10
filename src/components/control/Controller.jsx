import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import ProjectorController from "../projector/ProjectorController";
import axios from "axios";
import BackgroundController from "./BackgroundController";

const Controller = ({ versesToDisplay, booksToDisplay }) => {
    const [show, setShow] = useState(false);
    const [clear, setClear] = useState(false);
    const channel = new BroadcastChannel('projectorData');

    const [languages, setLanguages] = useState({});
    const [versions, setVersions] = useState({});

    const [fontSize, setFontSize] = useState(7);

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
            fontSize: fontSize,
            show: true
        });
    }, [fontSize]);

    useEffect(() => {
        console.log(background)
        channel.postMessage({
            background: background
        });
    }, [background]);
    
    useEffect(() => {
        if (show) {
            const verses = {};
            console.log(languages);
            if(languages.geo){
                console.log(versesToDisplay.bookIndex);
                axios.get(`https://holybible.ge/service.php?w=${versesToDisplay.bookIndex}&t=${versesToDisplay.chapter}&m=&s=&mv=${versions.geo}&language=geo&page=1`)
                    .then(response => {
                        let bv = [];
                        if(versesToDisplay.till !== null) {
                            for(let i = versesToDisplay.verse - 1; i <= versesToDisplay.till - 1; i++){
                                console.log(response.data.bibleData[i]);
                                bv.push(response.data.bibleData[i]);
                            }
                        } else {
                            bv.push(response.data.bibleData[versesToDisplay.verse - 1]);
                        }
                        
                        console.log(bv);

                        verses.geo = {
                            book: geoBooks[versesToDisplay.bookIndex - 1],
                            chapter: versesToDisplay.chapter,
                            verse: versesToDisplay.verse,
                            till: versesToDisplay.till,
                            bv: bv
                        }

                        console.log(verses);
                        channel.postMessage({
                            versesToDisplay: verses,
                            fontSize: fontSize,
                            show: show
                        });
                        setShow(false);
                    });
            } 
            if(languages.eng){
                axios.get(`https://holybible.ge/service.php?w=${versesToDisplay.bookIndex}&t=${versesToDisplay.chapter}&m=&s=&mv=${versions.eng}&language=eng&page=1`)
                    .then(response => {
                        let bv = [];
                        if(versesToDisplay.till !== null) {
                            for(let i = versesToDisplay.verse - 1; i <= versesToDisplay.till; i++){
                                bv.push(response.data.bibleData[i]);
                            }
                        } else {
                            bv.push(response.data.bibleData[versesToDisplay.verse - 1]);
                        }

                        console.log(engBooks);
                        
                        verses.eng = {
                            book: engBooks[versesToDisplay.bookIndex - 1],
                            chapter: versesToDisplay.chapter,
                            verse: versesToDisplay.verse,
                            till: versesToDisplay.till,
                            bv: bv
                        }

                        console.log(verses);
                        channel.postMessage({
                            versesToDisplay: verses,
                            fontSize: fontSize,
                            show: show
                        });
                        setShow(false);
                    });
            }
            if(languages.rus){
                axios.get(`https://holybible.ge/service.php?w=${versesToDisplay.bookIndex}&t=${versesToDisplay.chapter}&m=&s=&mv=${versions.rus}&language=russian&page=1`)
                    .then(response => {
                        let bv = [];
                        if(versesToDisplay.till !== null) {
                            for(let i = versesToDisplay.verse - 1; i <= versesToDisplay.till; i++){
                                bv.push(response.data.bibleData[i]);
                            }
                        } else {
                            bv.push(response.data.bibleData[versesToDisplay.verse - 1]);
                        }

                        console.log(engBooks);
                        
                        verses.rus = {
                            book: rusBooks[versesToDisplay.bookIndex - 1],
                            chapter: versesToDisplay.chapter,
                            verse: versesToDisplay.verse,
                            till: versesToDisplay.till,
                            bv: bv
                        }

                        console.log(verses);
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
        if(clear){
            channel.postMessage({ clear: clear });
            setClear(false);
        }
    }, [clear]);

    return (
        <>
            <div id="control">
                <ProjectorController setShow={setShow} setClear={setClear} setVersions={setVersions} setLanguages={setLanguages} setFontSize={setFontSize} fontSize={fontSize}/>
                <BackgroundController setBackground={setBackground}/>
            </div>
            <Buttons/>
        </>
    );
}

export default Controller;
