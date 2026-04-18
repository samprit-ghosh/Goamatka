import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth', { password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="glass-morphism p-8 rounded-3xl border-sky-500/30 neon-border">
        <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="text-sky-400" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-8">Admin Authorization</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Access Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-mono"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center font-bold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-600/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Unlock Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
