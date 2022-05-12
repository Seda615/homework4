import React from "react";

function Input({name, type, value, onChange}) {

    return (
        <>
            <label>{name}</label>
            <input type={type} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default Input