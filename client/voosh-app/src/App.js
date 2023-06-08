import axios from "axios"
import { UserContextProvider } from "./components/Register/UserContext";

import './App.css';
import Routes from './Routes'

function App() {
  axios.defaults.baseURL="http://localhost:8080/";
  axios.defaults.withCredentials= true;
  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  );
}

export default App;
