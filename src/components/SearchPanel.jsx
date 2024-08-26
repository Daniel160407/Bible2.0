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
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get(`https://holybible.ge/service.php?w=4&t=&m=&s=&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                setVersions(data.versions);
                setBooks(data.bibleNames);
                setChaptersAmount(data.tavi[0].cc);
                setVersesAmount(data.muxli[0].cc);

                setSelectedBook(data.bibleNames[3]);
                setSelectedBookIndex(4);
                setSelectedVersion(data.versions[0]);

                axios.get(`https://holybible.ge/service.php?w=4&t=1&m=&s=&mv=ახალი გადამუშავებული გამოცემა 2015&language=${language}&page=1`)
                    .then(response => {
                        setVerses(response.data.bibleData);
                        setSelectedChapter(1);

                        const selectedVerseData = {
                            book: data.bibleNames[3],
                            bookIndex: 4,
                            chapter: 1,
                            verse: 1,
                            till: null,
                            bv: [response.data.bibleData[0]]
                        }
            
                        setVersesToDisplay(selectedVerseData);
                    });
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
        setSelectedChapter('');
        setSelectedVerse(null);
        setSelectedTill(null);

        const bookName = e.target.value;
        const bookIndex = books.indexOf(bookName) + 1;
        setSelectedBook(bookName);
        setSelectedBookIndex(bookIndex);
        setBookToDisplay(bookName);
        axios.get(`https://holybible.ge/service.php?w=${bookIndex}&t=1&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                setChaptersAmount(data.tavi[0].cc);
                setVersesAmount(data.muxli[0].cc);

                const selectedVerseData = {
                    book: bookName,
                    bookIndex: bookIndex,
                    chapter: 1,
                    verse: 1,
                    till: null,
                    bv: [data.bibleData[0]]
                }
    
                setVersesToDisplay(selectedVerseData);
            })
            .catch(error => {
                console.error("There was an error fetching the versions!", error);
            });
    }

    const handleChapterChange = (e) => {
        setSelectedVerse(null);
        setSelectedTill(null);

        const chapter = e.target.value;
        setSelectedChapter(chapter);
        axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=${chapter}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
            .then(response => {
                const data = response.data;
                if (data.bibleData) {
                    setVerses(data.bibleData);

                    const selectedVerseData = {
                        book: selectedBook,
                        bookIndex: selectedBookIndex,
                        chapter: chapter,
                        verse: 1,
                        till: null,
                        bv: [data.bibleData[0]]
                    }
        
                    setVersesToDisplay(selectedVerseData);
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
        setSelectedTill(null);

        const verseIndex = parseInt(e.target.value) - 1;
        setSelectedVerse(verseIndex);
        setSelectedVerseIndex(verseIndex);

        if (verses && verses.length > verseIndex) {
            const selectedVerseData = {
                book: selectedBook,
                bookIndex: selectedBookIndex,
                chapter: parseInt(selectedChapter) || 1,
                verse: parseInt(verseIndex + 1),
                till: null,
                bv: [verses[verseIndex]]
            }

            setVersesToDisplay(selectedVerseData);
        } else {
            console.error('Selected verse index is out of bounds or verses is undefined');
        }
    }

    const handleTillChange = (e) => {
        const tillVerseIndex = parseInt(e.target.value) - 1;
        setSelectedTill(tillVerseIndex);

        const versesToDisplayArray = verses.slice(selectedVerseIndex, tillVerseIndex + 1);
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const pattern = /(\d?\D+?) (\d+):(\d+)(?:-(\d+))?/;
            const matcher = searchText.match(pattern);

            let bookindex;
    
            if (matcher) {
                const searchedBook = matcher[1].trim();
                let bookFound = false;
    
                for (let i = 0; i < books.length; i++) {
                    if (books[i].toLowerCase().startsWith(searchedBook.toLowerCase())) {
                        setSelectedBook(books[i]);
                        bookindex = i + 1;
                        setBookToDisplay(books[i]);
                        bookFound = true;
                        break;
                    }
                }
    
                if (bookFound) {
                    const searchedChapter = parseInt(matcher[2], 10);
                    setSelectedChapter(searchedChapter);
    
                    const searchedVerse = parseInt(matcher[3], 10);
                    setSelectedVerse(searchedVerse - 1);
                    setSelectedVerseIndex(searchedVerse - 1);
    
                    const searchedTill = matcher[4] ? parseInt(matcher[4], 10) : null;
                    setSelectedTill(searchedTill ? searchedTill - 1 : null);

                    axios.get(`https://holybible.ge/service.php?w=${bookindex}&t=${searchedChapter}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`)
                        .then(response => {
                            const data = response.data;
                            if (data.bibleData) {
                                setVerses(data.bibleData);
                                const versesToDisplayArray = data.bibleData.slice(searchedVerse - 1, searchedTill ? searchedTill : searchedVerse);
    
                                const versesToDisplay = {
                                    book: books[bookindex - 1],
                                    bookIndex: bookindex,
                                    chapter: searchedChapter,
                                    verse: searchedVerse,
                                    till: searchedTill,
                                    bv: versesToDisplayArray
                                };
                                setVersesToDisplay(versesToDisplay);
                            } else {
                                console.error('Bible data is not available in the response');
                            }
                        })
                        .catch(error => {
                            console.error("There was an error fetching the chapters!", error);
                        });
                } else {
                    console.error('Book not found');
                }
            } else {
                axios.get(`https://holybible.ge/service.php?w=${selectedBookIndex}&t=&m=&s=${e.target.value}&mv=${selectedVersion}&language=${language}&page=1`)
                    .then(response => {
                        const data = response.data;

                        const versesToDisplay = {
                            book: books[selectedBookIndex - 1],
                            bookIndex: selectedBookIndex - 1,
                            chapter: null,
                            verse: null,
                            till: null,
                            bv: data.bibleData
                        }
                        setVersesToDisplay(versesToDisplay);
                    });
            }
        }
    }
    
    const onClearButtonClick = () => {
        const versesToDisplay = {
            book: null,
            chapter: null,
            verse: null,
            till: null,
            bv: null
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
            <input id="search" type="text" placeholder="Search" value={searchText} onKeyPress={handleKeyPress} onChange={(e) => setSearchText(e.target.value)}></input>
            <button id="clearButton" onClick={onClearButtonClick}>Clear</button>
        </div>
    );
}

export default SearchPanel;
