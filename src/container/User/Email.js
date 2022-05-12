import React from "react";

function Email({name, value, onChange}) {

    return (
        <>
            <label>{name}</label>
            <input type={'email'} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default Email