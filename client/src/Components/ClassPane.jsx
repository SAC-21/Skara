import axios from 'axios';
import React from 'react';
import {useParams,Link} from 'react-router-dom';

 function ClassPane(){
    const{email,id}=useParams();
    const[classData,setClassData]=React.useState([]);
    React.useEffect(()=>{
    axios.get('http://localhost:8080/classpane/'+email+"/"+id)
    .then((res)=>{
        if(res.data.class.announcements.length!==classData.length)
      {
        setClassData(res.data.class.announcements);
      }
    })
    },[classData,email,id])
  const url2="/teams/"+email+"/"+id;
  const url="/createAnnouncement/"+email+"/"+id;
    return(<div>
        <Link to={url}>
        <li>Create Announcement</li>
        </Link>
        <Link to={url2}>
        <li>Teams</li>
        </Link>
        {classData.map((obj)=>{
         return(
           <ul>
          <li>{obj.author}</li>
            <li>{obj.text}</li>
            <li>{obj.time}</li>
            </ul>
        )})}
        </div>
        )
}
export default ClassPane;