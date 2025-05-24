import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PresentView from './components/projector/PresentView';
import Documentation from './components/Documentation';
import Bible from './components/Bible';
import DonationModal from './components/DonationModal';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/presentview' element={<PresentView />} />
                <Route path='/documentation' element={<Documentation />} />
                <Route path='/bible' element={<Bible />} />
                <Route path='/donation' element={<DonationModal />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
