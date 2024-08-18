import { useState } from 'react';
import '../style/Bible.scss';
import { useEffect } from 'react';
import axios from 'axios';

const Bible = () => {
    const [language, setLanguage] = useState('geo');
    const [versions, setVersions] = useState([]);
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [versesAmount, setVersesAmount] = useState([]);

    const [selectedVersion, setSelectedVersion] = useState('ახალი გადამუშავებული გამოცემა 2015');
    const [selectedBook, setSelectedBook] = useState('დაბადება');
    const [selectedBookIndex, setSelectedBookIndex] = useState(3);
    const [selectedChapter, setSelectedChapter] = useState(1);
    const [selectedVerse, setSelectedVerse] = useState(0);

    const [verses, setVerses] = useState([]);

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=4&t=&m=&s=&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                setVersions(data.versions);
                setBooks(data.bibleNames);

                const chapterArray = [];
                for(let i = 1; i <= data.tavi[0].cc; i++){
                    chapterArray.push(i);
                }
                setChapters(chapterArray);
            });

            axios.get(`https://holybible.ge/service.php?w=4&t=1&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                const chapterArray = [];
                for(let i = 1; i <= data.tavi[0].cc; i++){
                    chapterArray.push(i);
                }
                const verseArray = [];
                for(let i = 1; i <= data.muxli[0].cc; i++){
                    verseArray.push(i);
                }
                setChapters(chapterArray);
                setVersesAmount(verseArray);
                setSelectedChapter(1);
                setVerses(data.bibleData);
            });
    }, [language]);

    const handleBookChange = (e) => {
        const book = e.target.value;
        setSelectedBook(book);
        setSelectedBookIndex(books.indexOf(book) + 1);
        setVerses([]);

        axios.get(`https://holybible.ge/service.php?w=${books.indexOf(book) + 1}&t=1&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                const chapterArray = [];
                for(let i = 1; i <= data.tavi[0].cc; i++){
                    chapterArray.push(i);
                }
                setChapters(chapterArray);
                setSelectedChapter(1);
                setVerses(data.bibleData);
            })
            .catch(error => {
                console.error("There was an error fetching the versions!", error);
            });
    }

    const handleChapterChange = (e) => {
        const chapter = e.target.value;
        setSelectedChapter(chapter);

        axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=${chapter}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                if (data.bibleData) {
                    setVerses(data.bibleData);
                    console.log(data.bibleData);
                } else {
                    console.error('Bible data is not available in the response');
                }
            })
            .catch(error => {
                console.error("There was an error fetching the chapters!", error);
            });
    }

    const handleVerseChange = (e) => {
        const verse = e.target.value;
        setSelectedVerse(verse);
    
        for(let i = 0; i < verses.length; i++){
            if(verses[i].muxli == verse){
                for(let i = 0; i < verses.length; i++){
                    document.getElementById(`verse${verses[i].id}`).style.backgroundColor = "#2b3648";
                }
    
                const verseDiv = document.getElementById(`verse${verses[i].id}`);
                verseDiv.style.backgroundColor = "#4a4a6a";
    
                verseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }    

    return (
        <div id='bible'>
            <div className='searchPanel'>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value={'geo'}>GEO</option>
                    <option value={'eng'}>ENG</option>
                    <option value={'russian'}>RUS</option>
                </select>
                <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
                    {versions.map(version => (
                        <option value={version} key={version}>{version}</option>
                    ))}
                </select>
                <select value={selectedBook} onChange={handleBookChange}>
                    {books.map(book => (
                        <option value={book} key={book}>{book}</option>
                    ))}
                </select>
                <select value={selectedChapter} onChange={handleChapterChange}>
                    {chapters.map(chapter => (
                        <option value={chapter} key={chapter}>{chapter}</option>
                    ))}
                </select>
                <select value={selectedVerse} onChange={handleVerseChange}>
                    {versesAmount.map(verse => (
                        <option value={verse} key={verse}>{verse}</option>
                    ))}
                </select>
            </div>
            <div id='content'>
                <h1 id='title'>{selectedBook}</h1>
                {verses.map(verse => (
                    <div id={`verse${verse.id}`} key={verse.id} className='verse'>
                        <h1 className='verse-text'>{verse.bv}</h1>
                        <h1 className='verse-reference'>{selectedBook} {verse.tavi}:{verse.muxli}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bible;