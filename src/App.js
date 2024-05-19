import image from './image.png';
import logo from './GT.png';
import './App.css';
import {useNavigate} from "react-router-dom";
import CoursePlanner from './CoursePlanner';

//import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
const Continue = () => {
  const navigate = useNavigate();
  const page = navigate("./CoursePlanner")
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={image} className="App-logo" alt="logo"/>
        <p>
          Welcome to the OMSCS Course Planner!
        </p>
        
      </header>
    </div>
  );
}

export default App;
