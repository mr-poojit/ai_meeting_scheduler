import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tab, setTab] = useState<'manual' | 'agent'>('manual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert('Meeting Scheduled!');
      setFormData({ name: '', email: '', date: '', time: '' });
    } catch (err) {
      alert('Error scheduling meeting');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>AI Meeting Scheduler</h1>

      <div className="tabs">
        <button className={tab === 'manual' ? 'active' : ''} onClick={() => setTab('manual')}>Manual Booking</button>
        <button className={tab === 'agent' ? 'active' : ''} onClick={() => setTab('agent')}>AI Agent Booking</button>
      </div>

      <div className="theme-toggle">
        <label className="theme-switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          <span className="slider"></span>
        </label>
      </div>

      {tab === 'manual' ? (
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          <button type="submit">Book Meeting</button>
        </form>
      ) : (
        <div className="agent">
          <p>📞 Call our AI Agent at <strong>+1 9514944738</strong> to book a meeting!</p>
          <p>COMING SOON!!</p>
        </div>
      )}
    </div>
  );
}

export default App;
