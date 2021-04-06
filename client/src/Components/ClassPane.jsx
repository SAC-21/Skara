import axios from 'axios';
import React from 'react';
import {useParams,Link} from 'react-router-dom';

 function ClassPane(){
    const{email,id}=useParams();
    const[classData,setClassData]=React.useState([]);
    //     "announcement":[]
    // });
    React.useEffect(()=>{
    axios.get('http://localhost:8080/classpane/'+email+"/"+id)
    .then((res)=>{
        if(res.data.class.announcements.length!==classData.length)
      {
        setClassData(res.data.class.announcements);
        // console.log(res.data.class.announcements);
      }
    })
    },[classData,email,id])

    
  const url2="/createAnnouncement/"+email+"/"+id;
    return(<div>
        <Link to={url2}>
        <li>Create Announcement</li>
        </Link>
        {classData.map((announcement)=>(
            <li>{announcement}</li>
        ))}
        </div>
        )
}
export default ClassPane;