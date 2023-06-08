import { useState ,useContext, useEffect } from 'react'
import axios from "axios";
import { UserContext } from "../Register/UserContext";
import "./Dashboard.css"

const Dashboard = () => {
  const {name, id, setname, setId} = useContext(UserContext);
  const [order, setOrder]=useState(true);
  const [sub_total,setSub_total]=useState(0)
  const [phone_number,setPhone_number]=useState(0)
  const [orders, setOrders]=useState([])

  useEffect(()=>{
    axios.get('/orders/get-order')
      .then((res)=>{
        console.log(res.data)
        setOrders(res.data)
      })
  },[order])

  function logout(){
    axios.post('/user/logout-user')
      .then(()=>{
        setname(null)
        setId(null)
      })
  }

  function handleOrder(ev){
    ev.preventDefault();
    axios.post('/orders/add-order',{sub_total, phone_number})
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    setSub_total(0);
    setPhone_number(0);
  }
  
  function getCurrentTimeFromStamp (timestamp) {
    var d = new Date(timestamp);
    const timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();

    return timeStampCon;
  };


  return (
    <div className='container'>
      <h3 key={id}>Welcome {name}</h3>
      <div className='content'>
        <div className='left'>
          <button onClick={()=>setOrder(true)}>Add Order</button>
          <button onClick={()=>setOrder(false)}>All Orders</button>
          <button onClick={logout}>Logout</button>
        </div>
        <div className='right'>
          {order && (
              <form action="" onSubmit={handleOrder}>
                <section>
                  <label htmlFor="">Sub-Total: &nbsp;</label>
                  <input 
                  required
                  value={sub_total}
                  onChange={(ev)=>setSub_total(ev.target.value)}
                  placeholder='Sub-total'
                  type="number" />
                </section>
                <section>
                  <label htmlFor="">Phone Number: &nbsp;</label>
                  <input 
                  required
                  value={phone_number}
                  onChange={(ev)=>setPhone_number(ev.target.value)}
                  placeholder='Phone Number'
                  type="number" />
                </section>
                <button type='submit'>Add</button>
              </form>
          )}
          <div>
          {!order && <h4>Your Orders</h4>}
          {!order && (
            orders.map((od)=>(
              <section key={od._id}>
                <h5>Sub-Total: {od.sub_total}</h5>
                <h5>Phone: {od.phone_number}</h5>
                <p>Ordered At: {getCurrentTimeFromStamp(Date.parse(od.createdAt))}</p>
                <p>Order_ID: <i>{od._id}</i></p>
              </section>
            ))
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard