import React from 'react'
import moment from 'moment'
import '../static/css/message.css'

export const Message = (props) => {
    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
      }

    var m = props.m

    return (
        <React.Fragment>
            <div className="chat-message-left d-flex pb-4">
                <div className="">
                    {/* <img src={} alt="" /> */}
                </div>
                <div className="flex-shrink-1 bg-light rounded px-3 my-auto ml-3">
                    <div className="font-weight-bold mb-1"><strong>{titleCase(m.name)}</strong></div>
                    {m.body}
                    <div className="text-muted small text-nowrap mt-2"> {moment(m.dateCreated.toDate()).fromNow()} </div>
                </div>
            </div>
        </React.Fragment>
    )
}
