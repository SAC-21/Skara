import './App.css';
// import Login from './Components/login';
import Landing from './Components/landing';
import Teacher_Register from "./Components/teacher_register";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import createClassroom from "./Components/createClassroom";
import { Switch,Route} from 'react-router-dom';
// import Classcard from './Components/Classcard';
import ClassPane from './Components/ClassPane';
import createAnnouncement from "./Components/CreateAnnouncement";
import TeamPane from "./Components/TeamPane";

function App() {
    return <div>
    <Switch>
    <Route path="/"exact component={Landing}/>
    <Route path="/teacher_register" component={Teacher_Register}/>
    <Route path="/login" component={Login}/>
    <Route path='/dashboard/:username' component={Dashboard}/>
    <Route path="/createClassroom/:username" component={createClassroom}/>
    <Route path="/createAnnouncement/:username/:id" component={createAnnouncement}/>
    <Route path="/classroom/:username/:id" component={ClassPane}/>
    <Route path="/teams/:username/:id" component={TeamPane}/>
    </Switch>
    </div>
}

export default App;
