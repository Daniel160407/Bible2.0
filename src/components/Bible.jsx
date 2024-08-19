import { useState, useEffect } from 'react';
import '../style/Bible.scss';
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
    const [searchText, setSearchText] = useState('');

    const [verses, setVerses] = useState([]);
    const [results, setResults] = useState(0);

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=4&t=&m=&s=&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                setVersions(data.versions);
                setBooks(data.bibleNames);
                setSelectedBook(data.bibleNames[3]);

                const chapterArray = Array.from({ length: data.tavi[0].cc }, (_, i) => i + 1);
                setChapters(chapterArray);
            })
            .catch(error => console.error("Error fetching versions and books:", error));
    }, [language]);

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=4&t=1&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                const chapterArray = Array.from({ length: data.tavi[0].cc }, (_, i) => i + 1);
                const verseArray = Array.from({ length: data.muxli[0].cc }, (_, i) => i + 1);
                setChapters(chapterArray);
                setVersesAmount(verseArray);
                setSelectedChapter(1);
                setVerses(data.bibleData);
            })
            .catch(error => console.error("Error fetching version data:", error));
    }, [selectedVersion, language]);

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=1&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                const chapterArray = Array.from({ length: data.tavi[0].cc }, (_, i) => i + 1);
                setChapters(chapterArray);
                setSelectedChapter(1);
                setVerses(data.bibleData);
            })
            .catch(error => console.error("Error fetching book data:", error));
    }, [selectedBook, selectedBookIndex, selectedVersion, language]);

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=${selectedChapter}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                if (data.bibleData) {
                    setVerses(data.bibleData);
                    const verseArray = Array.from({ length: data.muxli[0].cc }, (_, i) => i + 1);
                    setVersesAmount(verseArray);
                } else {
                    console.error('Bible data is not available in the response');
                }
            })
            .catch(error => console.error("Error fetching chapter data:", error));
    }, [selectedChapter, selectedBookIndex, selectedVersion, language]);

    const handleVersionChange = (e) => setSelectedVersion(e.target.value);
    const handleBookChange = (e) => {
        const book = e.target.value;
        setSelectedBook(book);
        setSelectedBookIndex(books.indexOf(book) + 1);
        setVerses([]);
    };
    const handleChapterChange = (e) => setSelectedChapter(e.target.value);
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
    
    const handleNextButtonClick = () => {
        const nextChapter = parseInt(selectedChapter) + 1;
        setSelectedChapter(nextChapter);
    };

    const handleSearchAction = (e) => {
        if(e.key === 'Enter' && searchText.trim() !== ''){
            const searchPromises = books.slice(3).map((book, index) => 
                axios.get(`https://holybible.ge/service.php?w=${index + 4}&t=&m=&s=${searchText}&mv=${selectedVersion}&language=${language}&page=1`)
            );

            Promise.all(searchPromises)
                .then(results => {
                    const allVerses = results.flatMap(result => result.data.bibleData || []);
                    allVerses.forEach(verse => {
                        verse.searched = true;
                    });
                    setVerses(allVerses);
                    setResults(allVerses.length);
                })
                .catch(error => console.error("Error fetching search results:", error));
        }
    };

    return (
        <div id='bible'>
            <div className='searchPanel'>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value={'geo'}>GEO</option>
                    <option value={'eng'}>ENG</option>
                    <option value={'russian'}>RUS</option>
                </select>
                <select value={selectedVersion} onChange={handleVersionChange}>
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
                <input
                    type='text'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleSearchAction}
                    placeholder="Search verses..."
                />
            </div>
            <div id='content'>
                <h1 id='title'>{selectedBook}</h1>
                {verses.some(v => v.searched) && (
                    <p>{results} Results found</p>
                )}
                {verses.map(verse => (
                    <div id={`verse${verse.id}`} key={verse.id} className={`verse ${verse.searched ? 'searched' : ''}`}>
                        <h1 className='verse-text' dangerouslySetInnerHTML={{ __html: verse.bv }} />
                        <h1 className='verse-reference'>{verse.searched ? books[parseInt(verse.wigni) + 2] : selectedBook} {verse.tavi}:{verse.muxli}</h1>
                    </div>
                ))}
            </div>
            <div className='controlls'>
                <button onClick={handleNextButtonClick}>Next Chapter</button>
            </div>
        </div>
    );
};

export default Bible;
