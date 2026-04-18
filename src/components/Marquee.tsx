import { useEffect, useState } from 'react';
import axios from 'axios';

const Marquee = () => {
  const [texts, setTexts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/marquee').then(res => {
      setTexts(res.data.filter((t: any) => t.is_active));
    });
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee-content text-white font-bold text-lg tracking-wide">
        {texts.length > 0 ? texts.map(t => t.text).join(' 🔥 ') : 'Welcome to Goamatkaa 🔥 Join our casino affiliate program today for limitless earnings! 🔥 Fastest and Live Results Online'}
      </div>
    </div>
  );
};

export default Marquee;
