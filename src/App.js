import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const join = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });

    
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App ">
     <div className=" d-flex mt-4 justify-content-center align-items-center ">
     <div className="card shadow w-25">
        <input className="form-control "
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />

      
      </div>
      <button onClick={join} className="btn btn-dark ms-4 fw-bold"> JOIN ROOM</button>
     </div>

     <div  className=" d-flex justify-content-center align-items-center  mt-5">
    <div className="w-25">
    <input
        placeholder="Message..." className="form-control "
        onChange={(event) => {
          setMessage(event.target.value); 
        }} value={message}
      />
    </div>
      <button className="btn btn-success ms-4 fw-bold" onClick={sendMessage}> Send Message</button>
    
      
     </div>
 <div   className="card shadow d-flex justify-content-center align-items-center  mt-5" style={{height:"100px"}}>
<div className="w-25">
<h3> Message:</h3>
     <h5 className="text-danger">{messageReceived}</h5>
</div>
 </div>
    </div>
  );
}

export default App;