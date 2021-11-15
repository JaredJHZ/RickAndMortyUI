
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './App.css';
import { Bio } from './Layouts/BIo/Bio';
import { Main } from './Layouts/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/character/:id" element={<Bio/>} />
      </Routes>
    </BrowserRouter>
       
  );
}

export default App;
