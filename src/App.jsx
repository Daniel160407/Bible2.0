import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import PresentViewPage from './pages/PresentViewPage';
import BiblePage from './pages/BiblePage';
import DocumentationPage from './pages/DocumentationPage';
import DonationPage from './pages/DonationPage';

const App = () => (
  <BrowserRouter>
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
