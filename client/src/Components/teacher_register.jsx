import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Teacher_Register(){
    const history=useHistory();
    const [details,setDetails]=React.useState({
        fn:"",
        email:"",
        pw:"",
        classesEnrolled:[]
    });
function handleSubmit(){
    axios({
        method:"POST",
        data:{
            fn:details.fn,
            email:details.email,
            pw:details.pw,
            classesEnrolled:[]
        },
        withCredentials:true,
       url:"http://localhost:8080/teacher_register",
    }).then((res)=>{
        var queryExtender=res.data.email;
        history.push("/dashboard/"+queryExtender);
    });

}
function handleChange(event){
    const name=event.target.name;
    const value=event.target.value;
    setDetails(function(prev){
        const newvals={
            ...prev,
            [name]:value
        };
        return newvals;
    });
}


    return(
        <div>
    <form >
      <label for="fn">Name:</label>
      <input type="text" name="fn" value={details.fn} onChange={handleChange}/>
      <label for="email">Email:</label>
      <input type="email" name="email" value={details.email} onChange={handleChange}/>
      <label for="pw">Password:</label>
      <input type="password" name="pw" value={details.pw} onChange={handleChange}/>
      <button onClick={(event) => {
          
          event.preventDefault();
          handleSubmit();
          setDetails({
            fn: "",
            email: "",
            pw: "",
            classesEnrolled:[]
          });
          return;
        }}>Submit</button>
    </form>
        </div>
    )
}

export default Teacher_Register;