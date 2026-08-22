import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import AdminPage from './pages/AdminPage';
import PresentViewPage from './pages/PresentViewPage';
import BiblePage from './pages/BiblePage';
import DocumentationPage from './pages/DocumentationPage';
import DonationPage from './pages/DonationPage';

const App = () => (
  <BrowserRouter>
    <Toaster
      position="top-right"
      offset={20}
      gap={12}
      style={{ '--width': '400px' }}
      toastOptions={{ unstyled: true, classNames: { toast: 'w-full' } }}
    />
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="/presentview" element={<PresentViewPage />} />
      <Route path="/bible" element={<BiblePage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/donation" element={<DonationPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
