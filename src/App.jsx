import { useState } from 'react'
import SearchPanel from './components/SearchPanel'
import Verses from './components/Verses';
import Controller from './components/control/Controller';

const App = () => {
  const [versesToDisplay, setVersesToDisplay] = useState([]);
  const [bookToDisplay, setBookToDisplay] = useState('');
  
  return (
    <>
      <SearchPanel setVersesToDisplay={setVersesToDisplay} setBookToDisplay={setBookToDisplay}/>
      <Verses versesToDisplay={versesToDisplay} bookToDisplay={bookToDisplay}/>
      <Controller versesToDisplay={versesToDisplay} booksToDisplay={bookToDisplay}/>
    </>
  )
}

export default App
