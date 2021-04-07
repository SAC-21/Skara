import React from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';



function TeamPane(){
    const[teamData,setTeamData]=React.useState([]);
const {email,id}=useParams();
React.useEffect(()=>{
axios({
    method:"GET",
    url:"http://localhost:8080/team/"+email+"/"+id
}).then((res)=>{
    setTeamData(res.data.teams);
})
},[]);
console.log(teamData);
    return(
    <div>
    <li>hello</li>
    {teamData.map((team)=>(
        <li>{team.teamName}</li>
    ))}
    </div>
)
}

export default TeamPane;