import axios from 'axios';

async function test() {
  try {
    const res = await axios.get('http://127.0.0.1:3000/results');
    console.log('Results fetch success:', res.data.length);
    
    // Test POST
    const testDate = 'TEST-' + Date.now();
    const postRes = await axios.post('http://127.0.0.1:3000/results', {
      date: testDate,
      slot: '1',
      v1: '1',
      v3: '111'
    });
    console.log('Results post success:', postRes.data.date);
    
  } catch (err) {
    console.error('Test failed:', err.response?.data || err.message);
  }
}

test();
