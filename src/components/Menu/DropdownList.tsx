import React from "react";

const DropdownList = (props: any) => {
    const {children} = props
    return (
        <ul>
            {children}
        </ul>
    )
}

export default DropdownList
