import AddTask from './Components/AddTask';
import ShowSidebar from './Components/ShowSidebar';
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
        <ShowSidebar />
        <AddTask />
      </div>
    </div>
  );
}

export default App;