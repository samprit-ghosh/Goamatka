import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X as CloseIcon } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="bg-[#1b003a]/95 sticky top-0 z-[60] backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          <Link to="/" className="text-2xl md:text-3xl font-bold flex items-center shrink-0">
            <span className="text-white">Goa </span>
            <span className="text-red-600 ml-2">Matka</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center font-bold text-sm">
            <Link to="/" className="text-[#efbf04] hover:text-white transition-colors uppercase">Home</Link>
            <Link to="/about" className="text-[#efbf04] hover:text-white transition-colors uppercase">About</Link>
            <button 
              onClick={(e) => { e.preventDefault(); onOpenContact(); }}
              className="text-[#efbf04] hover:text-white transition-colors font-bold text-sm uppercase cursor-pointer"
            >
              Contact
            </button>
            <Link to="/old-results" className="text-[#efbf04] hover:text-white transition-colors uppercase">Old Result</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/admin"
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-lg text-slate-400 hover:text-white transition-all shadow-inner"
              title="Admin Panel"
            >
              <ShieldCheck size={20} />
            </Link>

            {/* Hamburger Mobile */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-yellow-500 p-2"
            >
              {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[55] transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[280px] bg-[#1b003a] border-l border-white/10 p-8 flex flex-col gap-6 shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-4">Navigation</div>
          <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-xl font-bold text-white hover:text-yellow-500 transition-colors uppercase">Home</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/about" className="text-xl font-bold text-white hover:text-yellow-500 transition-colors uppercase">About</Link>
          <button 
            onClick={(e) => { e.preventDefault(); onOpenContact(); setIsMenuOpen(false); }}
            className="text-left text-xl font-bold text-white hover:text-yellow-500 transition-colors uppercase"
          >
            Contact
          </button>
          <Link onClick={() => setIsMenuOpen(false)} to="/old-results" className="text-xl font-bold text-white hover:text-yellow-500 transition-colors uppercase">Old Result</Link>
          
          <div className="mt-auto py-8">
            <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
               <p className="text-yellow-500 font-black text-xs uppercase mb-2">Notice</p>
               <p className="text-gray-400 text-[10px] leading-relaxed">Please ensure you are following local laws regarding online entertainment.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
