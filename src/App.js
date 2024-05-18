import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the OMSCS Course Planner!
        </p>

        <button>
          Continue
        </button>
      </header>
    </div>
  );
}

export default App;
