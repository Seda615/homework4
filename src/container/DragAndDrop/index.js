import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import Boxes from "../Boxes";
import { dropElement, prevousState } from "../../store/actions";
import { dropElementsSelector } from "../../store/selectors";
import { ROW_COUNT, COLUMN_COUNT } from "../../const";

const boxElements = (
    () => {
        let boxElements = [];
        for (let i = 0; i < ROW_COUNT; i++) {
            boxElements[i] = [];
            for (let j = 0; j < COLUMN_COUNT; j++) {
                boxElements[i][j] = null
            }
        }
        return boxElements
    }
)();


function DragAndDrop() {

    const dropElements = useSelector(dropElementsSelector);

    const dispatch = useDispatch();

    const [dragElement, setDragElement] = useState({});

    const handleStart = (e) => {
        e.stopPropagation();
        setDragElement(e.target);
    }

    const dragEnd = (e) => {
        e.preventDefault();
        if (dropElements.length !== 0) setDragElement(null);

    }

    const isDropable = (i, j) => {

        const dropElem = [...dropElements];

        for (let k = 0; k < dropElem.length; k++) {
            if (dropElem[k].dropId === `${i}-${j}`) {
                return false;
            }
        }
        return true;
    }

    const getNeibours = (i, j) => {

        let neibours = {};

        if (i + 1 < ROW_COUNT && isDropable(i + 1, j)) {
            neibours = {...neibours, [`${i + 1}-${j}`]: `${i + 1}-${j}`};
        }
        if (i - 1 >= 0 && isDropable(i - 1, j)) {
            neibours = {...neibours, [`${i - 1}-${j}`]: `${i - 1}-${j}`};
        }
        if (j + 1 < COLUMN_COUNT && isDropable(i, j + 1)) {
            neibours = {...neibours, [`${i}-${j + 1}`]: `${i}-${j + 1}`};
        }
        if (j - 1 >= 0 && isDropable(i, j - 1)) {
            neibours = {...neibours, [`${i}-${j - 1}`]: `${i}-${j - 1}`};
        }

        return neibours
    }

    const drop = (e) => {
        const dropId = e.target.id;
        const dragId = dragElement.id;

        const neibours = getNeibours(+dropId[0], +dropId[dropId.length - 1]);

        dispatch(dropElement({neibours, dropId, dragId}));
        setDragElement(null);
        dragElement.className = '';
    }

    const redo = () => {
        const dropElem = [...dropElements];
        const dropId = dropElem[dropElem.length - 1]?.dropId;
        if (dropId !== undefined) {
            let neibours = {};
            for (let i = 0; i < dropElem.length - 1; i++) {
                const neibour = getNeibours(+dropElem[i].dropId[0], +dropElem[i].dropId[dropId.length - 1])
                neibours = {...neibours, ...neibour, [dropId]: dropId}
            }
            const rowCenter = Math.floor(ROW_COUNT / 2);
            const columnCenter = Math.floor(COLUMN_COUNT / 2);
            if (Object.keys(neibours).length === 0) {
                neibours =  {[`${rowCenter}-${columnCenter}`]: `${rowCenter}-${columnCenter}`};
                setDragElement('')
            }
            dispatch(prevousState({dragElement ,neibours}))
        }
    }

    return (
        <div className="container">
            <Sidebar
                handleStart={handleStart}
                dragEnd={dragEnd}
            /> 
            <Boxes
                drop={drop}
                dragElement={dragElement}
                boxElements={boxElements}
            />

            <button onClick={() => redo()} className="button">Redo</button>

        </div>
    )
}

export default DragAndDrop