import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage'; 

function App() {
  return (
    <Router>
      <Routes>  
        <Route path='/' exact element={<HomePage/>}/>
        <Route path='/chats' element={<ChatPage />}/>
     </Routes>
     </Router>
    
  );
}

export default App;
