import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar } from 'lucide-react';

const OldResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const [extras, setExtras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resResults, resExtras] = await Promise.all([
          axios.get('/api/results?limit=0'),
          axios.get('/api/extra?limit=0')
        ]);
        setResults(resResults.data);
        setExtras(resExtras.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b003a] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1b003a] min-h-screen text-white font-sans pb-20 pt-8">
      <div className="w-full px-0 md:px-4 py-4 md:py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-yellow-500 mb-4 tracking-tighter">
            OLD RESULTS HISTORY
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Browse through our complete historical database of Goa Matka and Goa Night results.
          </p>
        </div>

        {/* GOA NIGHT HISTORY */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-2 bg-red-600 rounded-full"></div>
            <h2 className="text-3xl font-black uppercase tracking-widest text-white">GOA NIGHT</h2>
          </div>

          <div className="space-y-6">
            {extras.map((res, i) => (
              <div key={i} className="bg-blue-900/20 border border-white/5 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-colors w-full shadow-2xl">
                <div className="bg-[#46001a] py-3 text-center text-xl font-bold border-b border-black">
                  {res.date}
                </div>
                <div className="grid grid-cols-2 divide-x divide-black border-b border-black font-black">
                   <div className="bg-yellow-500 text-black py-2 text-center text-xs uppercase">Market Open (09:45 PM)</div>
                   <div className="bg-yellow-500 text-black py-2 text-center text-xs uppercase">Market Close (11:35 PM)</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/5 bg-black/40">
                  <div className="flex flex-col items-center py-4">
                    <span className="text-white text-slate-400 font-mono text-lg">{res.open_3 || '---'}</span>
                    <span className="text-white text-lg font-medium"> {res.open_1 || '-'}</span>
                  </div>
                  <div className="flex flex-col items-center py-4">
                    <span className="text-white text-slate-400 font-mono text-lg"> {res.close_3 || '---'}</span>
                    <span className="text-white text-lg font-medium">{res.close_1 || '-'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GOA MATKA HISTORY */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-2 bg-orange-600 rounded-full"></div>
            <h2 className="text-3xl font-black uppercase tracking-widest text-white">GOA MATKA</h2>
          </div>

          <div className="space-y-8">
            {results.map((res, i) => (
              <div key={i} className="bg-blue-900/20 border border-white/5 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-[#46001a] py-3 text-center text-xl font-black tracking-widest">
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default OldResults;
