import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routess from './component/Routes/Routess';
import Supplierpurchaseorder from './component/Supplierpurchaseorder';


function App() {
  return (
    <div className="App">
     {/* <Login/> */}
     
     <Routess/>
    </div>
  );
}

export default App;
