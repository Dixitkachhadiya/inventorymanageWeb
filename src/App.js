import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Authentication from './Inventoryweb/Authentication';
import AddBusiness from './Inventoryweb/AddBusiness';
import Buiness from './Inventoryweb/Buiness';
import ChartBusiness from './Inventoryweb/ChartBusiness';
import Signup from './Inventoryweb/Signup';
import Signin from './Inventoryweb/Signin';
function App() {
  return (
    <>
        <BrowserRouter>
          <Authentication>
            <Routes>
              <Route path='/addbusiness' element={<AddBusiness></AddBusiness>}></Route>
              <Route path='/Buisness/:id' element={<Buiness></Buiness>}></Route>
              <Route path='/ChartBusiness/:id' element={<ChartBusiness></ChartBusiness>}></Route>
              <Route path='/signup' element={<Signup></Signup>}></Route>
              <Route path='/' element={<Signin></Signin>}></Route>
            </Routes>
          </Authentication>
        </BrowserRouter>
    </>
  );
}

export default App;
