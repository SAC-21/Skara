import './App.css';
// import Login from './Components/login';
import Landing from './Components/landing';
import Teacher_Register from "./Components/teacher_register";
import Login from "./Components/login";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

function App() {
    return <Router><div>
    <Route path="/"exact component={Landing}/>
    <Route path="/teacher_register" component={Teacher_Register}/>
    <Route path="/login" component={Login}/>
    </div>
    </Router>
}

export default App;
