import Tasks from './Components/Tasks';
import ShowSidebar from './Components/ShowSidebar';
import Sidebar from './Components/Sidebar';
import './Reset.css';
import "./Scss/style.css";
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';

function App() {
  const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <div className={isDarkTheme ? "App App-Dark" : "App"}>
      <div className={isSidebarHidden ? "sidebar-hide" : "sidebar-show"}>
        <div className='left'>
          <Sidebar />
        </div>
        <div className='right'>
          <Tasks />
          <ShowSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;