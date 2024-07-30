import './App.css';
// import ManageRequestButton from './component/stuatus';

import { Navbar } from './routing/navbar';
import { Routing } from './routing/routing';
import { DataProvider } from './component/Contexts/DataContext'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div >
      {/* <ManageRequestButton></ManageRequestButton> */}
     <Router>      
      <DataProvider>
      <div> 
        <Navbar />
        <Routing />
      </div> 
      </DataProvider>
    </Router>
    </div>
  );
}
export default App;
