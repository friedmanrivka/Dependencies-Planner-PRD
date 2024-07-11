import React from 'react';
import {Link} from 'react-router-dom';
export const Navbar=()=>{
    return(
        <nav>
          
                <Link to="/addRequest">addRequest</Link><br></br>
                <Link to="/">table</Link><br></br>
                <Link to="/group">Group</Link>
               
          
        </nav>
    )
}