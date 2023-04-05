import AddTask from './Components/AddTask';
import Boards from './Components/Boards';
import EditTask from './Components/EditTask';
import ShowSidebar from './Components/ShowSidebar';
import Sidebar from './Components/Sidebar';
import TaskDetails from './Components/TaskDetails';
import Tasks from './Components/Tasks';
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
        <Tasks />
        <div className='loading-lines-container'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </div>
  );
}

export default App;