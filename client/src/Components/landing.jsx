import React from 'react';
import {Link} from 'react-router-dom';

function landing(){
    return (<div>
        <ul>
        <Link to="/teacher_register">
          <li>Teacher Register</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
    </ul>
    </div>
    )
};

export default landing;