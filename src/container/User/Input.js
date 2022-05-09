import React from "react";

function Input({name, type, value, onChange, className}) {

    return (
        <>
            <label>{name}</label>
            <input type={type} name={name} value={value} onChange={onChange} className={className} />
        </>
    )
}

export default Input