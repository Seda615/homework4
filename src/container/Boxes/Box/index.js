import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {boxElementsSelector} from '../../../store/selectors'

const initialInputValue = {
    className: '',
    name: '',
    width: '',
    label: '',
    value: '',
    height: '',
    autofocus: '',
    option: '',
    rows: '',
    cols: '',
    placeholder: ''
}


function Box({dropElements, setOpenButton, id, drop, className, openButton}) {

    const formElements = useSelector(boxElementsSelector)

    const [attributes, setAttributes] = useState({});
    const [label, setLabel] = useState('');
    const [option, setOption] = useState('');
    const [style, setStyle] = useState({});
    const [inputValue, setInputValue] = useState(initialInputValue);

    const renderChild = (element) => {
        if (element.isSingleTag) {
            return (
                <>
                    {label && <label>{label}</label>}
                    <element.name
                        type={element.type}
                        defaultValue={element.value}
                        {...attributes}
                        style={style}
                        className="element"
                    />
                </>
            )
        }

        return (
            <>
                {label && <label>{label}</label>}
                <element.name
                    type={element.type}
                    {...attributes}
                    style={style}
                    className="element"
                >
                    {element.value}
                    {option && <option>{option}</option>}
                </element.name>
            </>
        )
    }

    const addAttribute = () => {
        const attr = Object.entries(inputValue);
        let styles = {};
        let attribute = {};

        inputValue.label !== '' && setLabel(inputValue.label);
        inputValue.option !== '' && setOption(inputValue.option);

        for (let i = 0; i < attr.length; i++) {
            if ((attr[i][0] === 'width' && attr[i][1] !== '') || (attr[i][0] === 'height' && attr[i][1] !== '')) {
                styles = {...styles, [attr[i][0]]: attr[i][1]}

            } else if (attr[i][0] !== 'label' && attr[i][0] !== 'option' && attr[i][1] !== '') {
                attribute = {...attribute, [attr[i][0]]: attr[i][1]};
            }
        }
        setStyle({...styles});
        setAttributes({...attribute})
        setInputValue(initialInputValue);
        setOpenButton('');
    }

    const renderAttribute = (boxId, attrs) => {
        if (openButton === boxId) {
            return (
                <form className='attr_menu'> 
                    <div>
                        {attrs.map((attr, i) => (
                            <div key={i}>
                                <label>{attr}</label>
                                <input
                                    value={inputValue[attr]}
                                    onChange={(e) => setInputValue({...inputValue, [attr]: e.target.value})}
                                />
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => addAttribute()} className="button">ok</button>
                </form>
            )

        } else {
            return (
                <div className='action'>
                    <button onClick={() => setOpenButton(boxId)} className="button">Action</button>
                </div>
            )
        }
    }
 

    return (
        <div
            key={id}
            id={id}
            className={className}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => drop(e)}
        > 
            {dropElements.map(dropElem => (
                <React.Fragment key={dropElem.dropId}>
                    {dropElem.dropId === id &&
                        formElements.map(sideElem => (
                            <React.Fragment key={sideElem.id}>
                                {sideElem.id === +dropElem.dragId &&
                                    <>
                                        {renderAttribute(id, sideElem.attrs)}
                                        {renderChild(sideElem)}
                                    </>
                                }
                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            ))}
        </div>
    )
}

export default Box