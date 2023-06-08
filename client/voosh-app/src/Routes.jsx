import { useContext } from "react";
import RegisterLoginForm from "./components/Register/RegisterLoginForm";
import { UserContext } from "./components/Register/UserContext";
import Dashboard from "./components/Dashboard/Dashboard";

export default function Routes(){
    const {name} = useContext(UserContext);
    if(name){
        return <Dashboard/>
    }
    return (
        <RegisterLoginForm/>
    )
} 