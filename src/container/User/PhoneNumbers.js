import React from "react";

function PhoneNumbers({name, value, onChange}) {

    return (
        <>
            <label>{name}</label>
            <input type={'text'} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default PhoneNumbers