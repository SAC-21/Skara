import React from 'react';

function Login(){
    return (
    <div>
    <form action="/login" method="post">
    <label for="email">Email:</label>
    <input type="email" name="email"/>
    <label for="password">Password</label>
    <input type="text" name="password"/>
    <button type="submit">Submit</button>
    </form>
  </div>);
};

export default Login;