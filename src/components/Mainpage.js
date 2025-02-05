import { useState } from "react";
import Homepage from "./Homepage";
import NavBar from "./NavBar";
import LoginForm from './LoginForm';
import RegistrationForm from './Registrationform'
import AddCourtForm from './AddCourtForm'
const Mainpage = ()=>{
    let [page,setPage]=useState('Homepage');
    let currentPage;
    if(page==='Homepage')
        currentPage=<Homepage/>
    else if(page==='login')
        currentPage=<LoginForm navigate={setPage}/>
    else if (page==='register')    
        currentPage=<RegistrationForm/>
        else if(page==='add-Court')
            currentPage=<AddCourtForm/>
    return(
        <div>
        <NavBar navigate={setPage}/>
        {currentPage}
        </div>
    );
}
export default Mainpage;