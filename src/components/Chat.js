import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'

const queryString = require('query-string');





function getSorts(name) {

    let splitted = name.split(" ")
    if (splitted.length >= 2) {
        return (splitted[0][0] + splitted[1][0]).toUpperCase()
    } else {
        return (splitted[0][0] + splitted[0][1]).toUpperCase()
    }
}



export default function Chat() {
    const el = useRef(null);
    let history = useHistory()
    let [msgs, setMsgs] = useState([])

    let [socket, setSocket] = useState(null)
    let [msgText, setMsgText] = useState("")
    let [UID, setUID] = useState("")

    let handleIsTyping = ()=>{

    }

    const URL = "ws://192.168.1.3:3030"
    useEffect(async () => {
        let { name } = queryString.parse(history.location.search);
        if (name == undefined) {
            return history.push("/")
        }
        let socket = await io(URL, { transports: ['websocket'], query: "name=suyash" })
        setSocket(socket)

        socket.emit('join', { name })


        socket.on('join-success', (data) => {
            console.log(data)
            let uid = data.newConnection.uid
            setUID(uid)
            setMember(data.connections)
        })

        socket.on('someone-disconneted', (data) => {
            setMember(data.connections)
        })
        socket.on('someone-joined', (data) => {
            setMember(data.connections)
        })


        socket.on('msg', (msgs) => {
            console.log("got msg : ", msgs)
            setMsgs(msgs)
            if(el.current != null){
                el.current.scrollIntoView({ behavior: "smooth" })    
            }
            
        })
    }, [])


    let [members, setMember] = useState([])

    let sendMsg = () => {

        socket.emit("msg", { msg: msgText, uid: UID })
        setMsgText("")
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-1 border py-2">
                    <div className="chats" >
                        {msgs.map(msg => {

                            return (msg.type == "msg" ? (<div key={msg.msgid} className={`chat ${msg.uid == UID ? "right" : ""} `} ref={el}> 
                                {msg.uid != UID &&
                                    <><small>{msg.name}</small><br></br></>
                                }
                                <p>{msg.msg}</p>
                            </div>) : (
                                <div className="chat text-center" key={msg.msgid} ref={el}>
                                    <small>{msg.msg}</small><br></br>
                                </div>
                            ))

                        })}



                    </div>




                    <div className="msg-text row">
                        <div className="col-md-10 ">
                            <input
                                type="text"
                                className="form-control"
                                value={msgText}
                                onChange={(e) => setMsgText(e.target.value)}
                            ></input>
                        </div>
                        <div className="col-md-2">
                            <button
                                className="btn btn-outline-primary"
                                onClick={sendMsg}

                            >send</button>
                        </div>
                    </div>

                </div>

                <div className="col-md-2 border participants">
                    <p className="h-4 text-center ">Participants</p>
                    <div className="row ">

                        {members.map(member => {
                            return (<div className="col-md-12 mt-5">
                                <span className="avatar">{getSorts(member.name)}</span>
                                <span className="name">{member.name}</span>
                            </div>)
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}
