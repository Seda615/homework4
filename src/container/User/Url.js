import React from "react";

function Url({name, value, onChange}) {

    return (
        <>
            <label>{name}</label>
            <input type={'text'} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default Url