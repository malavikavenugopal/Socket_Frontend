import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3002");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinroom", room);
      setShowChat(true);
    }
  };

  return (
    <div style={{ background: "black",color:"white" }}>
<div className="row vh-100 d-flex w-100 justify-content-center align-items-center">
 
 {
  !showChat ?
   <div className="col-lg-3">

    <h1>Welcome👋</h1>
    <h6>Set a username and room to get started</h6>
    <input className="form-control" style={{background:"grey"}}placeholder="Room" onChange={(e)=>setRoom(e.target.value)}/>
    <input className="form-control mt-3" placeholder="Username" style={{background:"grey"}}onChange={(e)=>setUsername(e.target.value)}/>
    <button className="btn mt-3 fw-bold" style={{background:"orange"}} onClick={joinRoom}>Enter</button>
  </div>
  : <Chat socket={socket}  username={username} room={room} />
 }
</div>

    </div>
  );
}

export default App;