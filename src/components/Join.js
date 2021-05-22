import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function Join() {
    let [name, setName] = useState("")
    let history = useHistory()
    let joinChat = ()=>{
        if(name.length >= 3){
            history.push(`/chat?name=${name}`)
        }else{
            alert("invalid name")
        }
        
    }  
    return (
        <div className='bg-img'>
            <div className="container join-form-contaier d-flex justify-content-center align-items-center">
                <div className=" w-50  pt-3 px-5 flat-box join-box">
                    <div className="row text-center flex-1">
                        <div className="col-md-12">
                            <p className="display-4 text-white">Join Chat</p>

                        </div>

                        <div className="col-md-12 mt-5">
                            <input 
                            className="form-control" 
                            name={name}  
                            placeholder="Your Name...."
                            onChange={e=>setName(e.target.value)}
                            ></input>
                        </div>

                        <div className="col-md-12 mt-5">
                            <button 
                            className="btn btn-outline-custom  text-white"
                            onClick={joinChat}
                            > Join </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
