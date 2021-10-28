import React, { useContext } from 'react'
import 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../static/images/logo.png'
import '../static/css/nav.css'
import { useAuth } from '../context/AuthContext'
import { DataContext } from '../context/DataProvider'



export const Navbar = () => {

    const { currentUser, signIn, signOut } = useAuth()

    const handleLogin = () => {
        signIn();
        console.log('Logged in successfully')
    }

    const { providerInfo, setCurrentGroup, currentGroup, createGroup } = useContext(DataContext)


    const handleClick = (e) => {
        var groupName = e.target.value;
        setCurrentGroup(groupName)
    }

    // const handleCreate = (e) => {
    //     e.preventDefault();
    //     const formData ={
    //         name: e.target.name.value
    //     }
    //     createGroup(formData)
    // }


    return (
        <React.Fragment>

            <nav className="navbar fixed-top navbar-expand-sm navbar-dark">
                {/* <Link to="/"><img className="navbar-brand " height="30px" alt="Smack Logo" src={logo} /></Link> */}

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        {/* <li className="nav-item ">
                            <Link className="nav-link" to="/">Home</Link>
                        </li> */}
                        {/* <li>
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li> */}

                        <li className="nav-item nav-accordion">
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
                                                    return <button className={`btn  shadow-none text-white w-100 ${(g.id === currentGroup) ? 'activeGroup' : null}`} onClick={(e) => handleClick(e)} value={g.id}>{g.name}</button>
                                                })}
                                            </div>
                                            <hr style={{ color: 'white', }} />
                                            <button className="btn w-100 text-white shadow-none" data-toggle="modal" data-target="#staticBackdrop">Create Group</button>
                                            <button className="btn w-100 text-white shadow-none text-nowrap">Add Group</button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item ">

                        </li>
                        {
                            !currentUser.loggedIn
                                ?
                                <li>
                                    <Link onClick={() => handleLogin()} className="nav-link" to="">Login</Link>
                                </li>
                                :
                                <React.Fragment>
                                    <li>
                                        <Link onClick={() => signOut()} className="nav-link text-white" to="">Logout</Link>
                                    </li>
                                    {/* <li>
                                        <Link className="nav-link" to="/auth/profile">Profile</Link>
                                    </li> */}
                                </React.Fragment>
                        }
                    </ul>

                </div>
            </nav>
        </React.Fragment>
    )
}
