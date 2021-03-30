import React from 'react';

function Teacher_Register(){
    return(
        <div>
    <form action="/home" method="post">
      <label for="fn">Name:</label>
      <input type="text" name="fn"/>
      <label for="email">Email:</label>
      <input type="email" name="email"/>
      <label for="pw">Password:</label>
      <input type="password" name="pw"/>
      <button type="submit">Submit</button>
    </form>
        </div>
    )
}
export default Teacher_Register;