import './App.css';
import { Navbar } from './routing/navbar';
import { Routing } from './routing/routing';
import { GroupProvider } from './component/groupContext';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div >
     <Router>      
      <GroupProvider>
      <div> 
        <Navbar />
        <Routing />
      </div> 
      </GroupProvider>
    </Router>
    </div>
  );
}
export default App;
