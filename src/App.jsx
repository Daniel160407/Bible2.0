import { useState } from 'react';
import SearchPanel from './components/SearchPanel';
import Verses from './components/Verses';
import Controller from './components/control/Controller';

const App = () => {
  const [versesToDisplay, setVersesToDisplay] = useState({ bv: [], book: '', verse: 0, chapter: 0 });
  const [bookToDisplay, setBookToDisplay] = useState('');
  const [separatedVerse, setSeparatedVerse] = useState(null);

  return (
    <>
      <SearchPanel setVersesToDisplay={setVersesToDisplay} setBookToDisplay={setBookToDisplay} setSeperatedVerse={setSeparatedVerse}/>
      <Verses versesToDisplay={versesToDisplay} setVersesToDisplay={setVersesToDisplay} setSeparatedProjectorVerse={setSeparatedVerse}/>
      <Controller versesToDisplay={versesToDisplay} separatedVerse={separatedVerse}/>
    </>
  )
}

export default App;
