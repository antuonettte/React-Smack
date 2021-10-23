import React, { useContext, useState } from 'react'
import '../static/css/sidenav.css'
import { DataContext } from '../context/DataProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import $ from 'jquery'



export const Sidebar = () => {

    const { providerInfo, setCurrentGroup, currentGroup, createGroup } = useContext(DataContext)


    const handleClick = (e) => {
        var groupName = e.target.value;
        setCurrentGroup(groupName)
    }

    const handleCreate = (e) => {
        e.preventDefault();
        const formData ={
            name: e.target.name.value
        }
        createGroup(formData)
    }


    return (
        <React.Fragment>
            <div className="sidenav">

                <div className="accordion accordion-flush " id="accordionFlushExample">
                    <div className="accordion-item bg-transparent">
                        <h2 className="accordion-header " id="flush-headingOne">
                            <button className={`accordion-button bg-transparent text-white shadow-none text-center`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Groups
                                {/* <i className={`bi pl-1 bi-arrow-${true ? 'down' : 'up'}`}></i> */}
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse show " aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {/* Group buttons */}
                                <hr style={{color: 'white',}}/>
                                <div className="groups">
                                    {providerInfo[2].map(g => {
                                        return <button className={`btn  shadow-none text-white w-100 ${(g.id === currentGroup) ? 'activeGroup' : null}`} onClick={(e) => handleClick(e)} value={g.id}>{g.name}</button>
                                    })}
                                </div>
                                <hr style={{color: 'white',}}/>
                                <button className="btn w-100 text-white shadow-none" data-toggle="modal" data-target="#staticBackdrop">Create Group</button>
                                <button className="btn w-100 text-white shadow-none text-nowrap">Add Group</button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Create Group</h5>
                            <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => handleCreate(e)}>
                                <div className="form-group" >
                                    <label for="groupName">Group Name</label>
                                    <input name="name" type="text" className="form-control mb-3 shadow-none" id="groupName"/>
                                </div>
                                <div className="form-group form-check">
                                    <input name="private" type="checkbox" className="form-check-input shadow-none" id="exampleCheck1"/>
                                    <label className="form-check-label" for="exampleCheck1">Private Group</label>
                                </div>
                                <button type="submit" className="btn btn-primary my-3 shadow-none">Create Group</button>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
