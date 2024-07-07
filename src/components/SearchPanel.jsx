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

    const [selectedVersion, setSelectedVersion] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedBookIndex, setSelectedBookIndex] = useState(3);
    const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
    const [selectedChapter, setSelectedChapter] = useState(null);
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
    }, []);

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
        setSelectedBookIndex(books.indexOf(e.target.value.toLowerCase()) + 1);
        setBookToDisplay(e.target.value);
        axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=0&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
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
        setSelectedChapter(e.target.value);
        axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=${e.target.value}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
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
        const selectedVerseIndex = parseInt(parseInt(e.target.value) - 1);
        setSelectedVerse(selectedVerseIndex);
        setSelectedVerseIndex(selectedVerseIndex);

        if (verses && verses.length > selectedVerseIndex) {
            const selectedVerseData = verses[selectedVerseIndex];

            if (selectedTill === null) {
                setVersesToDisplay([selectedVerseData]);
            } else {
                const versesToDisplay = [];
                for (let i = selectedVerseIndex; i < selectedTill - 1; i++) {
                    if (verses[i]) {
                        versesToDisplay.push(verses[i]);
                    }
                }
                setVersesToDisplay(versesToDisplay);
            }
        } else {
            console.error('Selected verse index is out of bounds or verses is undefined');
        }
    }

    const handleTillChange = (e) => {
        setSelectedTill(parseInt(e.target.value));

        const versesToDisplay = [];
                for (let i = selectedVerseIndex; i <= parseInt(e.target.value) - 1; i++) {
                    if (verses[i]) {
                        versesToDisplay.push(verses[i]);
                    }
                }
                setVersesToDisplay(versesToDisplay);
    }

    return (
        <div id="searchPanel">
            <select id="language" value={language} onChange={handleLanguageChange}>
                <option value="geo">GEO</option>
                <option value="eng">ENG</option>
                <option value="russian">RUS</option>
            </select>
            <select id="versions" onChange={(e) => setSelectedVersion(e.target.value)}>
                {versions.map(version => (
                    <option key={version} value={version}>{version}</option>
                ))}
            </select>
            <select id="books" onChange={handleBookChange}>
                {books.map(book => (
                    <option key={book} value={book}>{book}</option>
                ))}
            </select>
            <select id="chapters" onChange={handleChapterChange}>
                {Array.from({ length: chaptersAmount }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <select id="verses" onChange={handleVerseChange}>
                {Array.from({ length: versesAmount }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <select id="till" onChange={handleTillChange}>
                {Array.from({ length: versesAmount }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
        </div>
    );
}

export default SearchPanel;
