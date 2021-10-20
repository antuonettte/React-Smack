import React, { useContext } from 'react'
import '../static/css/sidenav.css'
import { DataContext } from '../context/DataProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'



export const Sidebar = () => {

    const { providerInfo, getGroups, setCurrentGroup, currentGroup } = useContext(DataContext)


    const handleClick = (e) => {
        var groupName = e.target.value;
        setCurrentGroup(groupName)
    }

    const handleSubmit = (e) => {
        e.preventDevault();
    }

    return (
        <React.Fragment>
            <div class="sidenav">

                <div class="accordion accordion-flush " id="accordionFlushExample">
                    <div class="accordion-item bg-transparent">
                        <h2 class="accordion-header " id="flush-headingOne">
                            <button class="accordion-button collapsed bg-transparent text-white shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Groups
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse " aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                {/* Group buttons */}
                                <div className="groups">
                                    {providerInfo[2].map(g => {
                                        return <button className={`btn  shadow-none text-white w-100 ${(g.id == currentGroup) ? 'activeGroup': null}`} onClick={(e) => handleClick(e)} value={g.id}>{g.name}</button>
                                    })}
                                </div>
                                {/* Add Group */}
                                <div class="dropdown ">
                                    <button class="btn dropdown-toggle text-white shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Add Group
                                    </button>
                                    <div class="dropdown-menu text-right bg-secondary" aria-labelledby="dropdownMenuButton">
                                        <button className="btn w-100 text-white">Create Group</button>
                                        <button className="btn w-100 text-white">Add Group</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>







            </div>
        </React.Fragment>
    )
}
