import * as actionTypes from '../action-types';
import { ROW_COUNT, COLUMN_COUNT } from '../../const';

const option = <option value='select'>select</option>


const sidebarElements = [
    {
        name: 'button',
        type: 'button',
        value: "button",
        id: 1,
        attrs: ['className', 'name', 'width', 'height', 'label'],
        isSingleTag: false
    },
    {
        name: 'input',
        type: 'text' ,
        id: 2,
        attrs: ['value', 'name', 'width', 'height', 'label', 'placeholder'],
        isSingleTag: true
    },
    {
        name: 'textarea',
        id: 3,
        attrs: ['name', 'rows', 'cols', 'width', 'height', 'label'],
        isSingleTag: true
    },
    {
        name: 'select',
        id: 4,
        value: option,
        attrs: ['name', 'autofocus', 'width', 'height', 'option', 'label'],
        isSingleTag: false
    },
    {
        name: 'input', 
        type: 'radio',
        id: 5,
        attrs: ['name', 'value', 'width', 'height', 'label'] ,
        isSingleTag: true
    },
    {
        name: 'input',
        type: 'checkbox',
        id: 6, 
        attrs: ['name', 'value', 'width', 'height', 'label'],
        isSingleTag: true
    },
    {
        name: 'select',
        id: 7,
        value: option,
        attrs: ['name', 'autofocus', 'width', 'height', 'option', 'label'],
        isSingleTag: false
    },
    {
        name: 'input', 
        type: 'radio',
        id: 8,
        attrs: ['name', 'value', 'width', 'height', 'label'] ,
        isSingleTag: true
    },
    {
        name: 'input',
        type: 'checkbox',
        id: 9, 
        attrs: ['name', 'value', 'width', 'height', 'label'],
        isSingleTag: true
    }
];

const rowCenter = Math.floor(ROW_COUNT / 2);
const columnCenter = Math.floor(COLUMN_COUNT / 2);

const initialState = {
    sidebarElements,
    boxElements: [],
    dropable: {[`${rowCenter}-${columnCenter}`]: `${rowCenter}-${columnCenter}`},
    dropElements: []

}

const reducer = (state=initialState, action) => {
    const {type, payload} = action;

    switch(type) {

        case actionTypes.DROP_ELEMENT: {
            let sidebarElem = [...state.sidebarElements];
            let dropElems = [...state.dropElements];
            let dropableBox = {...state.dropable};
            let boxElements = [...state.boxElements]

            const dragIndex = sidebarElem.findIndex((v) =>  v.id === +payload.dragId);
            const dropIndex = dropElems.findIndex(dropElem => dropElem.dropId === payload.dropId);
            let boxElement
            if (dropIndex === -1) {
                boxElement = sidebarElem.splice(dragIndex, 1);
                dropElems = ([...dropElems, {dropId: payload.dropId, dragId: payload.dragId}]);
                delete dropableBox[payload.dropId];
            }

            return {
                ...state,
                dropable: {...payload.neibours, ...dropableBox},
                sidebarElements: sidebarElem,
                dropElements: dropElems,
                boxElements: [...boxElements, ...boxElement],
            };

        }

        case actionTypes.PREVOUS_STATE: {

            const initState = [...initialState.sidebarElements];
            let sideBarElem = [...state.sidebarElements];
            const boxElements = [...state.boxElements];
            const dropElem = [...state.dropElements];
            const id = dropElem[dropElem.length - 1].dragId;
            const index = initState.findIndex(boxElem => boxElem.id === +id);
            boxElements.length !== 0 && sideBarElem.push(initState[index]);
            boxElements.pop();
            
            sideBarElem = sideBarElem.sort((elem1, elem2) => elem1.id - elem2.id );
            
            dropElem.pop();

            return {
                ...state,
                dropElements: dropElem,
                sidebarElements: sideBarElem,
                dropable: payload.neibours,
                boxElements: boxElements
            }
        }

        default:
            return state
    }
}

export default reducer;