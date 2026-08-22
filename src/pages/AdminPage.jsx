import { useRef, useState } from 'react';
import SearchPanel from '../features/admin/SearchPanel';
import VersePreview from '../features/admin/VersePreview';
import ProjectorPanel from '../features/admin/ProjectorPanel';
import ActionBar from '../features/admin/ActionBar';
import { EMPTY_DISPLAY } from '../lib/constants';

const AdminPage = () => {
  const [display, setDisplay] = useState(EMPTY_DISPLAY);
  const [separatedVerse, setSeparatedVerse] = useState(null);
  const showHandlerRef = useRef(null);

  const handleDisplayChange = (nextDisplay) => {
    setDisplay(nextDisplay);
    setSeparatedVerse(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col px-5 py-5">
      <SearchPanel
        onDisplayChange={handleDisplayChange}
        separatedVerse={separatedVerse}
        onShow={() => showHandlerRef.current?.()}
      />
      <VersePreview
        display={display}
        separatedVerse={separatedVerse}
        onSeparate={setSeparatedVerse}
      />
      <ProjectorPanel
        display={display}
        separatedVerse={separatedVerse}
        showHandlerRef={showHandlerRef}
      />
      <ActionBar />
    </div>
  );
};

export default AdminPage;
