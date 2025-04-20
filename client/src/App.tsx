import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="card">
        <h1>AI Voice Meeting Scheduler 🤖📅</h1>
        <p>Our smart agent will call and schedule your meetings like a human!</p>
        <button onClick={() => alert("Feature Coming Soon!")}>
          Call to Book a Meeting
        </button>
      </div>
    </div>
  );
};

export default App;
