import './App.css';
// import Login from './Components/login';
import Landing from './Components/landing';
import Teacher_Register from "./Components/teacher_register";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import createClassroom from "./Components/createClassroom";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Classcard from './Components/Classcard';

function App() {
    return <Router><div>
    <Switch>
    <Route path="/"exact component={Landing}/>
    <Route path="/teacher_register" component={Teacher_Register}/>
    <Route path="/login" component={Login}/>
    <Route path='/dashboard/:email' component={Dashboard}/>
    <Route path="/createClassroom/:email" component={createClassroom}/>
    <Route path="/classroom/:email/:id" component={Classcard}/>
    </Switch>
    </div>
    </Router>
}

export default App;
