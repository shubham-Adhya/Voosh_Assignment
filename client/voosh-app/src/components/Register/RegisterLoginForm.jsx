import axios from "axios";
import { useState , useContext} from "react";
import {UserContext} from './UserContext.jsx';
import './RegisterLoginForm.css'
export default function RegisterLoginForm(){
    const [name,setName]= useState('');
    const [phone_number,setPhone_number]= useState('');
    const [password, setPassword] = useState("");
    const [isLoginOrRegister, setIsLoginRegister]= useState('login');

    const {setname, setId } = useContext(UserContext);

    async function handleSubmit(ev){
        ev.preventDefault();
        const url= isLoginOrRegister==='register'? 'add-user':'login-user';
        await axios.post(`/user/${url}`,{name,phone_number,password})
        .then((res)=>{
            console.log(res)
            setname(res.data.name)
            setId(res.data._id)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="container">
            <form action="" onSubmit={handleSubmit} className="registerLoginForm">
                {isLoginOrRegister==='register' && (
                    <input 
                    value={name}
                    onChange={(ev)=> setName(ev.target.value)}
                    placeholder="Name"
                    type="text" />
                )}
                <input 
                value={phone_number}
                onChange={(ev)=> setPhone_number(ev.target.value)}
                placeholder="Phone Number"
                type="text" />
                <input
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                type="password"
                placeholder="Password"
                />
                <button type="submit">
                    {isLoginOrRegister==='register' ? 'Register': 'Login'}
                </button>
                <div>
                    {isLoginOrRegister==='register' && (
                        <div>
                            Already Have an account? &nbsp;
                            <button className="btn" onClick={()=>setIsLoginRegister('login')} >Login Here</button>
                        </div>
                    )}
                    {isLoginOrRegister==='login' && (
                        <div>
                            Dont Have an account? &nbsp;
                            <button className="btn" onClick={()=>setIsLoginRegister('register')} >Register Here</button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}