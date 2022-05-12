import React from "react";

function Numeric({name, value, onChange}) {

    return (
        <>
            <label>{name}</label>
            <input type={'number'} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default Numeric