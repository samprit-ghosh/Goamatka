const Footer = () => {
  return (
    <footer className="glass-morphism mt-20 border-t border-white/5 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-sky-400 italic">GOA MATKA</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            The world's fastest and most reliable platform for Goa Satta Matka results. 
            We provide real-time updates and historical data accurately.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-slate-300">Quick Links</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><a href="/" className="hover:text-sky-400 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-sky-400 transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-sky-400 transition-colors">Contact</a></li>
            <li><a href="/admin" className="hover:text-sky-400 transition-colors">Admin Login</a></li>
          </ul>
        </div>
        <div>
           <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-slate-300">Disclaimer</h4>
           <p className="text-[10px] text-slate-500 uppercase leading-tight">
             This website is for informational purposes only. Participation in matka or betting 
             may be illegal in your jurisdiction. Please check local laws before proceeding.
           </p>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} Goa-Matkaa.in - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
