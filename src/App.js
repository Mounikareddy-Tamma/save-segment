import './App.css';
import SegmentAndSchemas from './SegmentAndSchemas';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<SegmentAndSchemas/>}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
