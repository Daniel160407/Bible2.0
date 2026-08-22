import { useState } from 'react';
import SearchPanel from '../features/admin/SearchPanel';
import VersePreview from '../features/admin/VersePreview';
import ProjectorPanel from '../features/admin/ProjectorPanel';
import ActionBar from '../features/admin/ActionBar';
import { EMPTY_DISPLAY } from '../lib/constants';

const AdminPage = () => {
  const [display, setDisplay] = useState(EMPTY_DISPLAY);
  const [separatedVerse, setSeparatedVerse] = useState(null);

  const handleDisplayChange = (nextDisplay) => {
    setDisplay(nextDisplay);
    setSeparatedVerse(null);
  };

  return (
    <>
      <SearchPanel onDisplayChange={handleDisplayChange} />
      <VersePreview
        display={display}
        separatedVerse={separatedVerse}
        onSeparate={setSeparatedVerse}
      />
      <ProjectorPanel display={display} separatedVerse={separatedVerse} />
      <ActionBar />
    </>
  );
};

export default AdminPage;
