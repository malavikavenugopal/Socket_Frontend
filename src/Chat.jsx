import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (

        <div className="row">
            <div className="col-lg-3">

            </div>
            <div className="col-lg-6">
                <div className="chat">
                    <div className="head">
                        <p>Chats</p>
                    </div>
                    <div className="body">
                        <ScrollToBottom className="message-container">
                            {
                                messageList !== "" ?
                                    messageList.map((messageContent) => (
                                        <div
                                            className="message"
                                            id={username === messageContent.author ? "you" : "other"}
                                        >
                                            <div>
                                                <div className="message-content">
                                                    <p>{messageContent.message}</p>
                                                </div>
                                                <div className="message-meta">
                                                    <p style={{ color: "black" }} id="time">{messageContent.time}</p>
                                                    <p style={{ color: "black" }} id="author">{messageContent.author}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : null
                            }
                        </ScrollToBottom>
                    </div>
                    <div className="footer">
                        <input
                            type="text"
                            className="form-control"
                            value={currentMessage}
                            placeholder="Hey..."
                            onChange={(e) => {
                                setCurrentMessage(e.target.value);
                            }}


                        />
                        <button onClick={sendMessage}>&#9658;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;