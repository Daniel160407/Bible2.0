import { useState } from 'react';
import SearchPanel from './components/SearchPanel';
import Verses from './components/Verses';
import Controller from './components/control/Controller';

const App = () => {
  const [versesToDisplay, setVersesToDisplay] = useState({ bv: [], book: '', verse: 0, chapter: 0 });
  const [bookToDisplay, setBookToDisplay] = useState('');
  
  return (
    <>
      <SearchPanel setVersesToDisplay={setVersesToDisplay} setBookToDisplay={setBookToDisplay}/>
      <Verses versesToDisplay={versesToDisplay}/>
      <Controller versesToDisplay={versesToDisplay} bookToDisplay={bookToDisplay}/>
    </>
  )
}

export default App;
