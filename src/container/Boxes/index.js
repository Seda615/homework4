import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dropElementsSelector, dropableSelector } from "../../store/selectors";
import Box from "./Box";
import './style.css'

function Boxes({drop, boxElements, dragElement}) {

    const dropElements = useSelector(dropElementsSelector);
    const dropable = useSelector(dropableSelector);

    
    const [openButton, setOpenButton] = useState('')

    const dropBorder = (id) => {
        let classname = 'box_element';
        for (let i = 0; i < dropElements.length; i++) {
            if (dropElements[i].dropId === id) {
                classname = classname + ' drop';
            } 
        }
        return classname
    }

    const renderBox = (i, j) => {
        if (dropable[`${i}-${j}`] !== undefined && dragElement !== null) {
            return (
                <Box
                    dropElements={dropElements}
                    openButton={openButton}
                    setOpenButton={setOpenButton}
                    className="dropable box_element"
                    id={`${i}-${j}`}
                    drop={drop}
                />
            )
        } else {
            return (
                <Box
                    dropElements={dropElements}
                    openButton={openButton}
                    setOpenButton={setOpenButton}
                    drop
                    id={`${i}-${j}`}
                    className={dropBorder(`${i}-${j}`)}
                />
            )
        }
    }
            

    return (
        <div className="box">
            <h2>Box</h2>
            <div className="box_elements">
                {boxElements.map((elementsRow, i) => (
                    <div key={i}>
                        {elementsRow.map((column, j) => (
                            <React.Fragment key={j}>
                                {renderBox(i, j, elementsRow)}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Boxes