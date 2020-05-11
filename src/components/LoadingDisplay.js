import React from "react";
import "./LoadingDisplay.css";
//<i class="fas fa-spinner"></i>
// /<i className="fa fa-car LoadingDisplay"></i>
//compass 
// sync
export default function LoadingDisplay(props) {
    const messageText = !!props.MessageText ? props.MessageText : 'Loading';
    const iconVal = !!props.Icon ? props.Icon : 'spinner';
    const fullClass = `mx-auto fas fa-${iconVal} LoadingDisplay text-center`
    return (
        <div className="container mt-4">
            <div className="row mx-auto">
                <i className={fullClass}></i>
            </div>
            <div className="row mx-auto pt-5">
                <div className="mx-auto text-center messageText">{messageText}</div>
            </div>

        </div>
    )
}