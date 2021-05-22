import React, { Component } from 'react'
import io from 'socket.io-client'

export default class Socket extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             msgs:[],
             msg:"",
             uid:"",
             socket:null
        }
    }
    
    componentDidMount(){
        let socket = io("ws://localhost:3030", { transports: ['websocket']})

        socket.emit('join', {name:"suyash"})


        socket.on('join-success', (data)=>{
            this.setState({uid:data.uid})
            console.log(data)
        })

        socket.on('someone-joined', (data)=>{
            console.log(data)
        })

        socket.on('someone-disconnected', msg=>{
            console.log(msg)
        })

        socket.on('msg', msgs=>{  
            console.log("msg rcvd", msgs)
            this.setState({msgs:msgs}, ()=>{
                console.log("state is : ", this.state.msgs)
            })          
            
        })

        this.setState({socket})


    }

    sendMsg = ()=>{
        this.state.socket.emit('msg', {msg: this.state.msg, sender:this.state.uid})
    }




    render() {
        return (
            <div>
                <input type="text"
                 value={this.state.msg}
                 onChange={e=>this.setState({msg:e.target.value})}
                 ></input>



                <button
                onClick={this.sendMsg}
                >send message</button>


                
                    <ul>
                        {this.state.msgs.map(m=>{
                            
                          return( this.state.uid  == m.sender ? 
                            (<li>You :  {m.msg}</li>):
                            (<li>sender : {m.name} ==&gt; {m.msg}</li>))
                            
                            
                        })}
                    </ul>
                
            </div>
        )
    }
}
