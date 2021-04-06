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

function App() {
    return <div>
    <Switch>
    <Route path="/"exact component={Landing}/>
    <Route path="/teacher_register" component={Teacher_Register}/>
    <Route path="/login" component={Login}/>
    <Route path='/dashboard/:email' component={Dashboard}/>
    <Route path="/createClassroom/:email" component={createClassroom}/>
    <Route path="/createAnnouncement/:email/:id" component={createAnnouncement}/>
    <Route path="/classroom/:email/:id" component={ClassPane}/>
    </Switch>
    </div>
}

export default App;
