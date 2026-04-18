import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  LayoutDashboard,
  Moon,
  Type,
  LogOut,
  Database,
  Edit2,
  CheckCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [results, setResults] = useState<any[]>([]);
  const [extras, setExtras] = useState<any[]>([]);
  const [marquee, setMarquee] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  // Form states
  const [slotForm, setSlotForm] = useState({ slot: '1', v1: '', v3: '' });
  const [extraForm, setExtraForm] = useState({ type: 'open', v1: '', v3: '' });
  const [marqueeText, setMarqueeText] = useState('');
  const [editingMarqueeId, setEditingMarqueeId] = useState<string | null>(null);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatus({ type, text });
    setTimeout(() => setStatus(null), 3000);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/login'); return; }
    try {
      await axios.get('/api/auth', { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) { navigate('/login'); }
  };

  const fetchData = async () => {
    try {
      const [resResults, resExtras, resMarquee] = await Promise.all([
        axios.get('/api/results'),
        axios.get('/api/extra'),
        axios.get('/api/marquee')
      ]);
      setResults(resResults.data);
      setExtras(resExtras.data);
      setMarquee(resMarquee.data);

      const todayStr = formatDate();
      const today = resResults.data.find((r: any) => r.date === todayStr) || {};
      for (let i = 1; i <= 10; i++) {
        if (!today[`slot_${i}_1`] && !today[`slot_${i}_3`]) {
          setSlotForm(prev => ({ ...prev, slot: i.toString() }));
          break;
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', weekday: 'short'
    }).replace(/ /g, '-').replace(',', '(') + ')';
  };

  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/results', { date: formatDate(), ...slotForm });
      fetchData();
      setSlotForm({ ...slotForm, v1: '', v3: '' });
      showStatus('success', 'Saved');
    } catch (err) { showStatus('error', 'Update Failed'); }
  };

  const handleEditResult = (slot: string, v1: string, v3: string) => {
    setSlotForm({ slot, v1, v3 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteResultSlot = async (slotNum: string) => {
    if (!confirm('Clear slot?')) return;
    try {
      await axios.delete('/api/results', { data: { date: formatDate(), slot: slotNum } });
      fetchData();
      showStatus('success', 'Cleared');
    } catch (err) { showStatus('error', 'Error'); }
  };

  const handleAddExtra = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/extra', { date: formatDate(), ...extraForm });
      fetchData();
      setExtraForm({ ...extraForm, v1: '', v3: '' });
      showStatus('success', 'Saved');
    } catch (err) { showStatus('error', 'Error'); }
  };

  const handleAddMarquee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marqueeText.trim()) return;
    try {
      await axios.post('/api/marquee', { id: editingMarqueeId, text: marqueeText, is_active: true });
      fetchData();
      setMarqueeText('');
      setEditingMarqueeId(null);
      showStatus('success', editingMarqueeId ? 'Updated' : 'Added');
    } catch (err) { showStatus('error', 'Failed'); }
  };

  const toggleMarquee = async (item: any) => {
    try {
      await axios.post('/api/marquee', { id: item._id, text: item.text, is_active: !item.is_active });
      fetchData();
    } catch (err) { showStatus('error', 'Error'); }
  };

  const handleDeleteMarquee = async (id: string) => {
    if (!confirm('Delete?')) return;
    try {
      await axios.delete('/api/marquee', { data: { id } });
      fetchData();
      showStatus('success', 'Deleted');
    } catch (err) { showStatus('error', 'Failed'); }
  };

  const handleCleanup = async () => {
    if (!confirm('Delete data > 6 months?')) return;
    try {
      await axios.delete('/api/cleanup');
      fetchData();
      showStatus('success', 'Cleaned');
    } catch (err) { showStatus('error', 'Error'); }
  };

  if (loading) return <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-xs font-bold text-gray-500 font-mono">LOADING_SERVER...</div>;

  const todayStr = formatDate();
  const todayResult = results.find(r => r.date === todayStr) || {};
  const todayExtra = extras.find(e => e.date === todayStr) || {};

  const NavContent = () => (
    <div className="flex flex-col h-full uppercase font-bold tracking-tight">
      <div className="p-6 border-b border-gray-800 hidden lg:block text-center bg-[#0d1117]">
        <span className="text-xl text-white tracking-widest">ADMIN</span>
      </div>
      <nav className="p-4 space-y-1 flex-grow">
        {[
          { id: 'results', icon: LayoutDashboard, label: 'Results' },
          { id: 'extras', icon: Moon, label: 'Night' },
          { id: 'marquee', icon: MarqueeIcon, label: 'Text' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <item.icon size={16} /> <span className="text-xs uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800 space-y-2">
        <button onClick={handleCleanup} className="w-full py-2.5 text-amber-500 bg-amber-500/5 rounded-xl text-[10px] border border-amber-500/10 font-bold hover:bg-amber-500 hover:text-white transition-all"> Clean 6 months data</button>
        <button onClick={() => { localStorage.removeItem('adminToken'); navigate('/login'); }} className="w-full py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-bold hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95">EXIT DASHBOARD</button>
      </div>
    </div>
  );

  const MarqueeIcon = Type;

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans flex flex-col lg:flex-row text-sm">

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-56 bg-[#161b22] border-r border-gray-800 h-fit shrink-0">
        <NavContent />
      </aside>

      {/* Top Header - Mobile */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-14 bg-[#161b22]/90 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-5 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="font-black text-gray-100 uppercase tracking-tighter text-xs">Admin Control</span>
        </div>
        <button onClick={() => { localStorage.removeItem('adminToken'); navigate('/login'); }} className="text-red-500 text-[10px] font-bold uppercase tracking-widest border-b border-red-500/30">Logout</button>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-14 lg:pt-0 p-4 lg:p-8 overflow-x-hidden mt-10">

        {/* Mobile Operation Switcher */}
        <div className="lg:hidden my-8 space-y-2">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2">Switch Management Mode</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'results', label: 'Day Results', icon: LayoutDashboard },
              { id: 'extras', label: 'Night Market', icon: Moon },
              { id: 'marquee', label: 'Marquee Text', icon: MarqueeIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
                className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${activeTab === tab.id ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'bg-[#161b22] border-gray-800 text-gray-500'}`}
              >
                <div className="flex items-center gap-4">
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-400' : 'text-gray-600'} />
                  <span className="font-bold uppercase tracking-tight text-[11px]">{tab.label}</span>
                </div>
                {activeTab === tab.id && <CheckCircle size={14} className="text-blue-500/50" />}
              </button>
            ))}
          </div>
        </div>

        {/* Global Status Banner */}
        <div className="mb-10 flex justify-between items-center px-1">
          <div className="hidden lg:block">
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">{activeTab} CONTROL</h1>
            <p className="text-[10px] text-yellow-500 font-black uppercase mt-1 px-2 py-0.5 bg-yellow-500/5 border border-yellow-500/20 w-fit rounded-sm">{todayStr}</p>
          </div>
          {status && (
            <div className={`w-full lg:w-auto px-4 py-2.5 rounded-lg border-2 font-bold flex items-center justify-center gap-3 shadow-xl ${status.type === 'success' ? 'bg-green-600/10 border-green-500/20 text-green-400' : 'bg-red-600/10 border-red-500/20 text-red-500'}`}>
              <span className="text-[10px] uppercase tracking-widest">{status.text}</span>
            </div>
          )}
        </div>

        <div className="space-y-8 pb-20">

          {activeTab === 'results' && (
            <>
              {/* Form - Medium Size */}
              <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-xl">
                <form onSubmit={handleAddResult} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-white ml-1">
                      Slot Identification
                    </label>

                    <select
                      value={slotForm.slot}
                      onChange={e => setSlotForm({ ...slotForm, slot: e.target.value })}
                      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-3 px-4 text-white text-xs font-bold outline-none"
                    >
                      {[...Array(10)].map((_, i) => {
                        const sNum = (i + 1).toString();
                        const filled = !!(todayResult[`slot_${sNum}_1`] || todayResult[`slot_${sNum}_3`]);
                        if (filled && slotForm.slot !== sNum) return null;
                        return <option key={sNum} value={sNum}>SLOT {sNum}</option>;
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-white ml-1">
                      1-Digit Value
                    </label>

                    <input
                      type="text"
                      value={slotForm.v1}
                      onChange={e => setSlotForm({ ...slotForm, v1: e.target.value })}
                      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-3 px-4 text-white font-bold outline-none"
                      placeholder="-"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-white ml-1">
                      3-Digit Value
                    </label>

                    <input
                      type="text"
                      value={slotForm.v3}
                      onChange={e => setSlotForm({ ...slotForm, v3: e.target.value })}
                      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-3 px-4 text-white font-bold outline-none"
                      placeholder="---"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white h-[48px] rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
                  >
                    Submit
                  </button>

                </form>
              </div>

              {/* Day Management View */}
              <div className="bg-[#161b22] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto lg:ml-8">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#0d1117] border-b border-gray-800 text-[12px] uppercase font-black text-white-500 tracking-[0.2em]">
                        <th className="px-8 py-4">Slot</th>
                        <th className="px-8 py-4 text-center">Results</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/40">
                      {[...Array(10)].map((_, i) => {
                        const sNum = (10 - i).toString();
                        const v1 = todayResult[`slot_${sNum}_1`];
                        const v3 = todayResult[`slot_${sNum}_3`];
                        const active = v1 || v3;
                        return (
                          <tr key={sNum} className="hover:bg-white/[0.01]">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${active ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'bg-gray-800 text-gray-600'}`}>{sNum}</div>
                                <span className="font-bold text-white-400 text-xs">Slot {sNum} Index</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-center font-mono">
                              <span className="text-xl text-white font-medium">{v1 || '-'}</span>
                              <span className={`text-xl ml-6 ${v3 ? 'text-white' : 'text-white'}`}>{v3 || '---'}</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleEditResult(sNum, v1, v3)} className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-lg font-bold text-[9px] uppercase border border-blue-600/20">Edit</button>
                                <button onClick={() => handleDeleteResultSlot(sNum)} className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-lg font-bold text-[9px] uppercase border border-red-600/20">Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE LIST - Reduced size but accessible */}
                <div className="lg:hidden flex flex-col divide-y divide-gray-800">
                  {[...Array(10)].map((_, i) => {
                    const sNum = (10 - i).toString();
                    const v1 = todayResult[`slot_${sNum}_1`];
                    const v3 = todayResult[`slot_${sNum}_3`];
                    const active = v1 || v3;
                    return (
                      <div key={sNum} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${active ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'bg-gray-800 text-gray-700'}`}>{sNum}</span>
                          <div className="flex gap-4">
                            <div><p className="text-lg text-white font-medium leading-none">{v1 || '--'}</p></div>
                            <div><p className="text-lg text-white leading-none mt-1">{v3 || '---'}</p></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditResult(sNum, v1, v3)} className="bg-blue-600/20 text-blue-400 p-3 rounded-xl border border-blue-500/10 active:scale-95 transition-all"><Edit2 size={18} /></button>
                          <button onClick={() => handleDeleteResultSlot(sNum)} className="bg-red-600/20 text-red-500 p-3 rounded-xl border border-red-500/10 active:scale-95 transition-all"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === 'extras' && (
            <div className="space-y-8">
              <div className="bg-[#161b22] p-6 lg:p-8 rounded-2xl border border-gray-800 shadow-xl">
           <form onSubmit={handleAddExtra} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase font-bold text-white ml-1">
      Market Segment
    </label>

    <select
      value={extraForm.type}
      onChange={e => setExtraForm({ ...extraForm, type: e.target.value })}
      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-3 px-4 text-white font-bold outline-none"
    >
      {['open', 'close'].map(t => {
        const filled = !!(todayExtra[`${t}_1`] || todayExtra[`${t}_3`]);
        if (filled && extraForm.type !== t) return null;
        return <option key={t} value={t}>{t.toUpperCase()}</option>;
      })}
    </select>
  </div>


  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase font-bold text-white ml-1">
      1D Single
    </label>

    <input
      type="text"
      value={extraForm.v1}
      onChange={e => setExtraForm({ ...extraForm, v1: e.target.value })}
      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-3 px-4 text-white font-bold"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase font-bold text-white ml-1">
      3D Panel
    </label>

    <input
      type="text"
      value={extraForm.v3}
      onChange={e => setExtraForm({ ...extraForm, v3: e.target.value })}
      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-3 px-4 text-white font-bold"
    />
  </div>



  <button
    type="submit"
    className="bg-indigo-600 hover:bg-indigo-500 text-white h-[48px] rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg active:scale-95"
  >
    Update
  </button>

</form>
              </div>

              <div className="bg-[#161b22] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#0d1117] border-b border-gray-800 text-[12px] uppercase font-black text-white tracking-[0.2em]">
                        <th className="px-8 py-4">Market</th>
                        <th className="px-8 py-4 text-center">Results</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/40">
                      {['open', 'close'].map(t => {
                        const v1 = todayExtra[`${t}_1`];
                        const v3 = todayExtra[`${t}_3`];
                        const active = v1 || v3;
                        return (
                          <tr key={t} className="hover:bg-white/[0.01]">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase ${active ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'bg-gray-800 text-gray-600'}`}>{t[0]}</div>
                                <span className="font-bold text-white text-xs uppercase">{t} Market</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-center font-mono">
                              <span className="text-xl text-white font-medium">{v1 || '---'}</span>
                              <span className={`text-xl ml-6 ${v3 ? 'text-white' : 'text-white'}`}>{v3 || '-'}</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => { setExtraForm({ type: t as any, v1: v1 || '', v3: v3 || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-lg font-bold text-[9px] uppercase border border-blue-600/20">Edit</button>
                                <button onClick={async () => {
                                  if (!confirm('Delete?')) return;
                                  await axios.post('/api/extra', { date: formatDate(), type: t, v1: '', v3: '' });
                                  fetchData();
                                  showStatus('success', 'Deleted');
                                }} className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-lg font-bold text-[9px] uppercase border border-red-600/20">Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List View */}
                <div className="lg:hidden flex flex-col divide-y divide-gray-800">
                  {['open', 'close'].map(t => {
                    const v1 = todayExtra[`${t}_1`];
                    const v3 = todayExtra[`${t}_3`];
                    const active = v1 || v3;
                    return (
                      <div key={t} className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black uppercase ${active ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'bg-gray-800 text-gray-700'}`}>{t[0]}</span>
                          <div className="flex gap-5">
                            <p className="text-xl text-white font-medium leading-none">{v1 || '---'}</p>
                            <p className="text-xl text-white leading-none">{v3 || '-'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setExtraForm({ type: t as any, v1: v1 || '', v3: v3 || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-blue-600/20 text-blue-400 p-3 rounded-xl border border-blue-500/10 active:scale-95 transition-all"><Edit2 size={18} /></button>
                          <button onClick={async () => {
                            if (!confirm('Delete?')) return;
                            await axios.post('/api/extra', { date: formatDate(), type: t, v1: '', v3: '' });
                            fetchData();
                            showStatus('success', 'Deleted');
                          }} className="bg-red-600/20 text-red-500 p-3 rounded-xl border border-red-500/10 active:scale-95 transition-all"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'marquee' && (
            <div className="space-y-6">
              <div className="bg-[#161b22] p-6 lg:p-10 rounded-2xl border border-gray-800 shadow-xl">
                <form onSubmit={handleAddMarquee} className="flex flex-col lg:flex-row gap-4">
                  <input type="text" value={marqueeText} onChange={e => setMarqueeText(e.target.value)} placeholder="Type communication feed..." className="flex-grow bg-[#0d1117] border border-gray-800 focus:border-green-600 rounded-xl px-6 py-4 text-white font-bold outline-none text-base" />
                  <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-lg">
                    {editingMarqueeId ? 'Update' : 'Publish'}
                  </button>
                </form>
              </div>

              <div className="grid gap-3 px-1">
                {marquee.map(item => (
                  <div key={item._id} className="bg-[#161b22] px-6 py-5 rounded-2xl border border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-md">
                    <div className="flex items-center gap-6 w-full lg:w-auto">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${item.is_active ? 'bg-green-500 shadow-[0_0_15px_#10b981]' : 'bg-gray-800'}`}></div>
                      <p className={`text-base font-bold leading-snug ${item.is_active ? 'text-white' : 'text-gray-700'}`}>{item.text}</p>
                    </div>
                    <div className="flex gap-2 w-full lg:w-auto items-center justify-center">
                      <button onClick={() => toggleMarquee(item)} className={`px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase transition-all flex-grow lg:flex-grow-0 ${item.is_active ? 'bg-amber-600/20 text-amber-500 border border-amber-600/20' : 'bg-green-600/20 text-green-500 border border-green-600/20'}`}>
                        {item.is_active ? 'DESYNC' : 'ACTIVATE'}
                      </button>
                      <button onClick={() => { setMarqueeText(item.text); setEditingMarqueeId(item._id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-lg font-bold text-[9px] uppercase border border-blue-600/20">Edit</button>
                      <button onClick={() => handleDeleteMarquee(item._id)} className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-lg font-bold text-[9px] uppercase border border-red-600/20">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
        
        {/* GLOBAL ADMIN REFERENCE CHART */}
        <div className="mt-20 mb-10 bg-[#161b22] mx-auto max-w-3xl px-3 md:px-6 py-10 lg:p-12 rounded-3xl border border-gray-800 shadow-2xl flex flex-col items-center">
          <h2 className="text-white text-[15px] uppercase font-black tracking-widest mb-10 text-center bg-gray-900/50 py-2 px-8 rounded-full border border-gray-800/50 w-fit"> Result Reference</h2>
          <div className="w-full md:max-w-xl flex justify-center">
            <img 
              src="/result-chart.png" 
              alt="Result Logic Chart" 
              className="w-full h-auto rounded-xl border border-gray-700 shadow-xl opacity-75 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
