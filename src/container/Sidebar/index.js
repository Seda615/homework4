import React from "react";
import { useSelector } from "react-redux";
import './style.css';

function Sidebar({ handleStart, dragEnd}) {

    const sidebarElements = useSelector(state => state.sidebarElements)

    const renderChild = (element) => {
        if (element.isSingleTag) {
            return (
                <element.name
                    type={element.type}
                    defaultValue={element.value}
                    className="element"
                />
            )
        }

        return (
            <element.name type={element.type} className="element" >
                {element.value}
            </element.name>
        )
    }

    return (
        <div className="sidebar">
            <h2>SideBar</h2>
            <form className="sidebar_form">
                {sidebarElements.map((element, i) => (
                    <div
                        className='childEventsPreventer'
                        key={element.id}
                        id={element.id}
                        draggable='true'
                        onDragEnd={dragEnd}
                        onDragStart={handleStart}
                    >
                        {renderChild(element)}
                    </div>
                ))}
            </form>
        </div>
    )
}

export default Sidebar