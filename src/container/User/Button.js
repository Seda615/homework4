import React from "react";

function Button({type, value, className}) {

    return (
        <>
            <button type={type} className={className}>{value}</button>
        </>
    )
}

export default Button