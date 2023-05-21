import './Reset.css';
import "./Scss/style.css";
import { useSelector } from 'react-redux';
// ===== Components.
import Sidebar from './Components/Sidebar';
import ShowSidebar from './Components/ShowSidebar';
import Tasks from './Components/Tasks';
import Temp from './Components/Temp';


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
          <Temp />
        </div>
  
      </div>
    </div>
  );
}

export default App;