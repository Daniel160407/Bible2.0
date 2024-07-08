import axios from "axios";
import { useEffect, useState } from "react";
import '../style/SearchPanel.scss';

const SearchPanel = ({ setVersesToDisplay, setBookToDisplay }) => {
    const [language, setLanguage] = useState('geo');
    const [versions, setVersions] = useState([]);
    const [books, setBooks] = useState([]);
    const [chaptersAmount, setChaptersAmount] = useState(0);
    const [versesAmount, setVersesAmount] = useState(0);
    const [verses, setVerses] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedBookIndex, setSelectedBookIndex] = useState(3);
    const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
    const [selectedChapter, setSelectedChapter] = useState(1);
    const [selectedVerse, setSelectedVerse] = useState(null);
    const [selectedTill, setSelectedTill] = useState(null);

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=4&t=&m=&s=&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                setVersions(data.versions);
                setBooks(data.bibleNames);

                setSelectedBook(data.bibleNames[3]);
                setSelectedVersion(data.versions[0]);
            })
            .catch(error => {
                console.error("There was an error fetching the versions!", error);
            });
    }, [language]);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        axios.get(`https://holybible.ge/service.php?w=4&t=0&m=&s=&language=${selectedLanguage}&page=1`)
            .then(response => {
                const data = response.data;
                setVersions(data.versions);
                setBooks(data.bibleNames);
            })
            .catch(error => {
                console.error("There was an error fetching the versions!", error);
            });
    }

    const handleBookChange = (e) => {
        const bookName = e.target.value;
        const bookIndex = books.indexOf(bookName) + 1;
        setSelectedBook(bookName);
        setSelectedBookIndex(bookIndex);
        setBookToDisplay(bookName);
        axios.get(`https://holybible.ge/service.php?w=${bookIndex}&t=0&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                setChaptersAmount(data.tavi[0].cc);
                setVersesAmount(data.muxli[0].cc);
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
                } else {
                    console.error('Bible data is not available in the response');
                }
                setVersesAmount(data.muxli[0].cc);
            })
            .catch(error => {
                console.error("There was an error fetching the chapters!", error);
            });
    }

    const handleVerseChange = (e) => {
        const verseIndex = parseInt(e.target.value) - 1;
        setSelectedVerse(verseIndex);
        setSelectedVerseIndex(verseIndex);

        if (verses && verses.length > verseIndex) {
            const selectedVerseData = {
                book: selectedBook,
                bookIndex: selectedBookIndex,
                chapter: parseInt(selectedChapter),
                verse: parseInt(verseIndex + 1),
                till: null,
                bv: [verses[verseIndex]]
            }

            if (selectedTill === null) {
                setVersesToDisplay(selectedVerseData);
            }
        } else {
            console.error('Selected verse index is out of bounds or verses is undefined');
        }
    }

    const handleTillChange = (e) => {
        const tillVerseIndex = parseInt(e.target.value) - 1;
        setSelectedTill(tillVerseIndex);

        const versesToDisplayArray = verses.slice(selectedVerseIndex, tillVerseIndex + 1);
        console.log(selectedBookIndex);
        const versesToDisplay = {
            book: selectedBook,
            bookIndex: selectedBookIndex,
            chapter: parseInt(selectedChapter),
            verse: parseInt(selectedVerse + 1),
            till: parseInt(tillVerseIndex + 1),
            bv: versesToDisplayArray
        };
        setVersesToDisplay(versesToDisplay);
    }

    return (
        <div id="searchPanel">
            <select id="language" value={language} onChange={handleLanguageChange}>
                <option value="geo">GEO</option>
                <option value="eng">ENG</option>
                <option value="russian">RUS</option>
            </select>
            <select id="versions" value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
                {versions.map(version => (
                    <option key={version} value={version}>{version}</option>
                ))}
            </select>
            <select id="books" value={selectedBook} onChange={handleBookChange}>
                {books.map(book => (
                    <option key={book} value={book}>{book}</option>
                ))}
            </select>
            <select id="chapters" value={selectedChapter} onChange={handleChapterChange}>
                {Array.from({ length: chaptersAmount }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <select id="verses" value={selectedVerse + 1} onChange={handleVerseChange}>
                {Array.from({ length: versesAmount }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <select id="till" value={selectedTill + 1} onChange={handleTillChange}>
                {Array.from({ length: versesAmount }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
        </div>
    );
}

export default SearchPanel;
