import React from 'react';
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';
import Classcard from "./Classcard";
function Dashboard(){
const [classesData,setClassesData]=React.useState({
  "classesEnrolled":[]
});

const {email}=useParams();

  React.useEffect(() => {
  axios({
    method: 'GET',
    url: 'http://localhost:8080/dashboard/'+email    // responseType: 'stream'
  })
    .then((res)=> {
      if(res.data.classesEnrolled.classesEnrolled.length!==classesData.classesEnrolled.length)
      {
      setClassesData(res.data.classesEnrolled);
      }
    });
  },[classesData,email]);
    
  const url="/createClassroom/"+email;
    return(<div>
      <Link to={url}>
        <li>Create Classroom</li>
      </Link>
     
      {classesData.classesEnrolled.map((classroom,index)=>(
            <Classcard id={classroom.classCode} name={classroom.className}/>
        ))}
      </div>
    )
}

export default Dashboard;