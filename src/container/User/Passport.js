import React from "react";

function Passport({name, value, onChange}) {

    return (
        <>
            <label>{name}</label>
            <input type={'text'} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default Passport