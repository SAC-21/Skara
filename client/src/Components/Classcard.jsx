import React from 'react';
import {Link,useParams} from 'react-router-dom';
function Classcard(props){

    const{email}=useParams();
    
    // let {pro}={props.id};
    // console.log(pro);
    return(
    <div>

    <Link to={"/classroom/"+email+"/"}>
        <li>{props.name}</li>
        </Link>
        <li>{props.id}</li>
    </div>
)
}

export default Classcard;