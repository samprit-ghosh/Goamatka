import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Marquee from '../components/Marquee';


interface HomeProps {
   onOpenContact: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenContact }) => {
   const [results, setResults] = useState<any[]>([]);
   const [extras, setExtras] = useState<any[]>([]);
   const [currentTime, setCurrentTime] = useState(new Date());

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [resResults, resExtras] = await Promise.all([
               axios.get('/api/results'),
               axios.get('/api/extra')
            ]);
            setResults(resResults.data);
            setExtras(resExtras.data);
         } catch (err) {
            console.error(err);
         }
      };
      fetchData();
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
   }, []);

   const formatDate = () => {
      return currentTime.toLocaleDateString('en-IN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric'
      }).replace(/\//g, '-');
   };

   const formatTime = () => {
      return currentTime.toLocaleTimeString('en-IN', {
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         hour12: true
      }).toUpperCase();
   };



   return (
      <div className="bg-[#1b003a] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">

         {/* SECTION 1: Nav & Hero */}
         <div className="w-full bg-blue-900/40 border-b border-blue-500/20 py-3 mt-5">
            <Marquee />
         </div>

         <section className="container mx-auto px-8 py-16 md:py-20 lg:py-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 md:space-y-6 lg:pl-12">
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight">
                  Unlock <span className="text-red-500">limitless earnings!</span> Join our <span className="text-yellow-400 font-extrabold decoration-red-600 underline-offset-8">Affiliate</span> program.
               </h1>
               <p className="text-slate-300 text-xs md:text-sm lg:text-base leading-relaxed max-w-lg">
                  Online gambling involves betting or playing games of chance on the internet, including casino games, sports betting, and poker. It offers convenience and accessibility but also carries the risk of gambling addiction and financial loss.
               </p>
               <div className="flex flex-wrap gap-4 pt-2">
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-10 py-3.5 rounded-xl text-xs md:text-sm uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.3)]">GOA NIGHT </button>
                  <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-black px-10 py-3.5 rounded-xl text-xs md:text-sm uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95">GOA MATKA</button>
               </div>
            </div>
            <div className="relative pt-10 pb-16 group cursor-pointer lg:hover:z-10 lg:translate-x-12">
               <img
                  src="/banner.png"
                  alt="Roulette"
                  className="w-full max-w-[250px] md:max-w-sm lg:max-w-md mx-auto brightness-100 contrast-180 transition-all duration-700 ease-out lg:group-hover:scale-105 drop-shadow-[0_0_60px_rgba(234,179,8,0.25)]"
               />
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#4a0e2a] px-8 py-3 md:px-12 md:py-3.5 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center gap-3 w-max transition-all duration-300">
                  <span className="text-xl md:text-2xl font-bold">💥</span>
                  <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"></span>
                  <span className="text-xl md:text-2xl font-bold">💥</span>
               </div>
            </div>
         </section>

         {/* SECTION 2: Online Casino Promo */}
         <section className="relative w-full min-h-[350px] md:h-[300px] overflow-hidden flex items-center py-12 md:py-0">

            {/* Background Video */}
            <video
               autoPlay
               loop
               muted
               playsInline
               className="absolute w-full h-full object-cover"
            >
               <source src="/casino-video.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay - Slightly deeper on mobile for better text contrast */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 space-y-4 md:space-y-6 text-center">
               <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-yellow-400 uppercase tracking-widest lg:whitespace-nowrap">
                  Play Online Casino & Win Money Unlimited
               </h2>

               <p className="max-w-4xl mx-auto text-gray-100 text-sm md:text-base leading-relaxed font-medium">
                  Gambling online involves placing bets or playing games of chance over the internet, typically on platforms offering casino games, sports betting, or poker. While it provides convenience and accessibility, it also poses risks of addiction and financial loss due to its easy access and immersive nature.
               </p>
            </div>

         </section>

         {/* SECTION 3: Live Clock Bar */}
         <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center items-center gap-4 md:gap-12 text-lg md:text-2xl font-bold">
            <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
               <span className="text-xl">📅</span>
               <span className="text-gray-400 text-sm md:text-xl uppercase font-black">Date:</span>
               <span className="text-yellow-400">{formatDate()}</span>
            </div>
            <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
               <span className="text-xl">⏰</span>
               <span className="text-gray-400 text-sm md:text-xl uppercase font-black">Time:</span>
               <span className="text-yellow-400">{formatTime()}</span>
            </div>
         </div>

         {/* SECTION 4: Daily Jackpot Result (Palm Tree Circle) */}
         <section className="w-full py-12 flex flex-col items-center justify-center bg-[#1b003a]">
            {/* The Layout exactly as shown in the picture, now in a ROUND section */}
            <div className="flex flex-col items-center">
               <div className="relative w-50 md:w-80 lg:w-80 rounded-full border-[4px] border-white/20 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <img src="/result.jpg" alt="Daily Result" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center pt-24 md:pt-32">
                     <span className="text-lg mt-12 md:text-5xl lg:text-5xl font-black text-yellow-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] tracking-tighter">
                        {results[0]?.slot_10_1 ? `${results[0].slot_10_3}-${results[0].slot_10_1}` : '--- : -'}
                     </span>
                  </div>
               </div>

               <div className="mt-8">
                  <h3 className="text-white text-2xl md:text-4xl font-black uppercase tracking-widest drop-shadow-md">
                     11:00 AM
                  </h3>
               </div>
            </div>
         </section>

         {/* SECTION 5: Rotating Roulette Wheel */}
         <section className="w-full py-12 md:py-16 flex flex-col items-center overflow-hidden">
            <img
               src="/round-img.png"
               alt="Roulette Wheel"
               className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 mb-4 drop-shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-[spin_6s_ease-in-out_infinite]"
            />
         </section>

         {/* SECTION 5: Night History Tables */}
         <section className="w-full py-16 space-y-12">


            {extras.map((res, i) => (
               <div key={i} className="space-y-0 md:rounded-lg overflow-hidden border-y md:border border-white/5 shadow-2xl">
                  {/* Date Header (Maroon) */}
                  <div className="bg-[#46001a] text-center py-2 text-lg font-bold uppercase tracking-widest">
                     {res.date}
                  </div>

                  {/* Market Type Row (Yellow) */}
                  <div className="grid grid-cols-2 divide-x divide-black">
                     <div className="bg-yellow-500 text-black text-xs font-black py-1 text-center">09:45 PM</div>
                     <div className="bg-yellow-500 text-black text-xs font-black py-1 text-center">11:35 PM</div>
                  </div>

                  {/* Results Row */}
                  <div className="grid grid-cols-2 divide-x divide-white/10 bg-black/20">
                     <div className="flex flex-col items-center py-4 justify-center">
                        <span className="text-white text-slate-400 font-mono text-lg">{res.open_3 || '---'}</span>
                        <span className="text-white text-lg font-medium">{res.open_1 || '-'}</span>
                     </div>
                     <div className="flex flex-col items-center py-4 justify-center">
                        <span className="text-white text-slate-400 font-mono text-lg">{res.close_3 || '---'}</span>
                        <span className="text-white text-lg font-medium">{res.close_1 || '-'}</span>
                     </div>
                  </div>
               </div>
            ))}

            <div className="flex justify-center pt-8">
               <Link to="/old-results" className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-2 rounded-lg transition-all transform hover:scale-105 uppercase tracking-widest">
                  View History
               </Link>
            </div>
         </section>

         {/* SECTION 6: Day History Tables */}
         <section className="w-full py-16 space-y-12">
            {/* Table Category Header */}
            <div className="bg-orange-600/80 text-center py-2 text-2xl font-black uppercase tracking-widest rounded-t-lg">
               GOA MATKA
            </div>

            {results.map((res, i) => (
               <div key={i} className="space-y-0 md:rounded-lg overflow-hidden border-y md:border border-white/5 shadow-2xl">
                  {/* Date Header (Maroon) */}
                  <div className="bg-[#46001a] text-center py-2 text-lg font-bold uppercase tracking-widest">
                     {res.date}
                  </div>

                  <div className="w-full">
                     {/* Time Slot Row (Yellow) */}
                     <div className="grid grid-cols-10 divide-x divide-black border-b border-black">
                        {[10, 11, 12, 1, 2, 3, 4, 5, 6, 7].map((h, t) => (
                           <div key={t} className="bg-yellow-500 text-black py-1.5 text-center flex flex-col items-center justify-center leading-none tracking-tighter">
                              <span className="text-[10px] md:text-sm font-black">{h}:00</span>
                              <span className="text-[8px] md:text-xs font-bold">{h >= 10 && h < 12 ? 'AM' : 'PM'}</span>
                           </div>
                        ))}
                     </div>

                     {/* Results Row */}
                     <div className="grid grid-cols-10 divide-x divide-white bg-[#0a0a20]">
                        {[...Array(10)].map((_, t) => (
                           <div key={t} className="flex flex-col items-center py-3 min-h-[65px] justify-center leading-none tracking-[calc(-0.02em)] border-b border-white/5">
                              <span className="text-white text-[11px] md:text-lg font-bold">{res[`slot_${t + 1}_3`] || '---'}</span>
                              <span className="text-white text-[15px] md:text-2xl font-black mt-1">{res[`slot_${t + 1}_1`] || '-'}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}

            <div className="flex justify-center pt-8">
               <Link to="/old-results" className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-2 rounded-lg transition-all transform hover:scale-105 uppercase tracking-widest">
                  View History
               </Link>
            </div>
         </section>

         {/* Floating Button */}
         <button
            onClick={onOpenContact}
            className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 py-4 rounded-full shadow-[0_0_25px_rgba(234,179,8,0.5)] z-50 transition-all transform active:scale-90 hover:scale-105"
         >
            Contact
         </button>
      </div>
   );
};

export default Home;
