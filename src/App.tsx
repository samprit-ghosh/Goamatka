import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import OldResults from './pages/OldResults';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#1b003a] text-slate-100 flex flex-col">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/old-results" element={<OldResults />} />
          </Routes>
        </main>
        <Footer />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
