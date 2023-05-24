import './Reset.css';
import "./Scss/style.css";
import { useSelector } from 'react-redux';
// ===== Components.
import Sidebar from './Components/Sidebar';
import ShowSidebar from './Components/ShowSidebar';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import NewBoard from './Components/NewBoard';
import Temp from './Components/Temp';
import EditBoard from './Components/EditBoard';
import TaskDetails from './Components/TaskDetails';


function App() {
  const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <div className={isDarkTheme ? "App" : "App light-theme"}>
      <div className={isSidebarHidden ? "sidebar sidebar-hide" : "sidebar"}>

        <div className='sidebar-content'>
          <Sidebar />
          <ShowSidebar />
        </div>
        <div className='main-content'>
          <Tasks />
          <AddTask />
          <NewBoard />
          <EditBoard />
          <TaskDetails />
        </div>
  
      </div>
    </div>
  );
}

export default App;