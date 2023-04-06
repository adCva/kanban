
import Sidebar from './Components/Sidebar';
import './Reset.css';
import "./Scss/style.css";

function App() {
  return (
    <div className="App">
      <div className='left'>
        <Sidebar />
      </div>
      <div className='right'>
        abc
      </div>
    </div>
  );
}

export default App;