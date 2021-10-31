import React, { useContext, useState } from 'react';
import '../static/css/sidenav.css';
import { DataContext } from '../context/DataProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from 'react-bootstrap/Modal';



export const Sidebar = () => {
    const { providerInfo, setCurrentGroup, currentGroup, createGroup } = useContext(DataContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (e) => {
        var groupName = e.target.value;
        setCurrentGroup(groupName)
        providerInfo[1]([])
    }

    const handleCreate = (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value
        }
        createGroup(formData)
        setShow(false)

    }

    // const handleAddGroup = () => {
        
    // }


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
                                <hr style={{ color: 'white', }} />
                                <div className="groups">
                                    {providerInfo[2].map(g => {
                                        return <button className={`btn shadow-none w-100 ${(g.id === currentGroup) ? 'activeGroup' : ''}`} onClick={(e) => handleClick(e)} value={g.id}>{g.name}</button>
                                    })}
                                </div>
                                <hr style={{ color: 'white', }} />
                                <button className="btn w-100 text-white shadow-none" onClick={handleShow}>Create Group</button>
                                {/* <button className="btn w-100 text-white shadow-none text-nowrap" onClick={handleAddGroup}>Add Group</button> */}


                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Modal show={show} onHide={handleClose} class>
                <Modal.Header >
                    <Modal.Title>Create Group</Modal.Title>
                    <button type="button" className="btn-close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => handleCreate(e)}>
                        <div className="form-group" >
                            <label for="groupName">Group Name</label>
                            <input name="name" type="text" className="form-control mb-3 shadow-none" id="groupName" />
                        </div>
                        <div className="form-group form-check">
                            {/* <input name="private" type="checkbox" className="form-check-input shadow-none" id="exampleCheck1" /> */}
                            {/* <label className="form-check-label" for="exampleCheck1">Private Group</label> */}
                        </div>
                        <button type="submit" onClick={handleClose} className="btn btn-primary my-3 shadow-none mx-auto">Create Group</button>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer></Modal.Footer> */}
            </Modal>
            
        </React.Fragment>
    )
}
