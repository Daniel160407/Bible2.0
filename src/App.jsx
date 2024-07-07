import { useState } from 'react'
import SearchPanel from './components/SearchPanel'
import Verses from './components/Verses';

function App() {
  const [versesToDisplay, setVersesToDisplay] = useState([]);
  const [bookToDisplay, setBookToDisplay] = useState('');
  
  return (
    <>
      <SearchPanel setVersesToDisplay={setVersesToDisplay} setBookToDisplay={setBookToDisplay}/>
      <Verses versesToDisplay={versesToDisplay} bookToDisplay={bookToDisplay}/>
    </>
  )
}

export default App
