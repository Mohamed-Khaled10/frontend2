import React from 'react';

const NavBar=({navigate})=>{
    return(
        <nav>
            <div className="logo" onClick={()=>{
                       navigate('home')
                    }}>
                Travel Agency
            </div>
            <div>
                <ul>
                    <li onClick={()=>{
                       navigate('login')
                    }}>login</li>
                    <li onClick={()=>{
                       navigate('register')
                    }}>register</li>
                </ul>
            </div>
        </nav>
    );

}
export default NavBar