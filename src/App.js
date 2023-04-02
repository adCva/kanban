import Sidebar from './Components/Sidebar';
import Test from './Components/Test';
import './Reset.css';
import "./Scss/style.css";

function App() {
  return (
    <div className="App">
      <div className='left'>
        <Test />
      </div>
      <div className='right'>
        Test #2
      </div>
    </div>
  );
}

export default App;