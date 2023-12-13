import First from './components/First.jsx'
import Second from './components/Second.jsx';
import Third from './components/Third.jsx'
import Fifth from './components/Fifth.jsx';
import CreateQuiz from './components/CreateQuiz.jsx';
import MyLoginModal from './components/MyLoginModal.jsx';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';


export default function App() {
  return <BrowserRouter>
  

      <Routes>
        <Route path='/quiz' element={<First/>} />
        <Route path='/LeaderBoard' element={<Second/>} />
        <Route path='/scoreboard' element={<Third/>} />
        <Route path='/home' element={<Fifth/>} />
        <Route path='/CreateQuiz' element={<CreateQuiz/>} />
        <Route path='/signup' element={<MyLoginModal/>} />
      </Routes>
  
    
    
    </BrowserRouter>
}

