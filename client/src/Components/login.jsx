import axios from 'axios';
import React from 'react';
import{useHistory} from 'react-router-dom';

function Login(){

  const [details,setDetails]=React.useState({
    email:String,
    password:String
  });
  const history=useHistory();
  function handleSubmit(){
    axios({
      method:"POST",
      data:{
        email:details.email,
        password:details.password
      },
      withCredentials:true,
      url:"http://localhost:8080/login"
    }).then((res) => {
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
    return (
    <div>
    <form>
    <label for="email">Email:</label>
    <input type="email" name="email" value={details.email} onChange={handleChange}/>
    <label for="password">Password</label>
    <input type="text" name="password" value={details.password} onChange={handleChange}/>
    <button onClick={(event)=>{
      event.preventDefault();
      handleSubmit()
      setDetails({
        email:"",
        password:""
      });
return;
    }
    }>Submit</button>
    </form>
  </div>);
};

export default Login;