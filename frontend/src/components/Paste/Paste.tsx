import React, { useEffect, useState } from "react";
import { Props } from "../../interface";
import "./Paste.scss"
const Paste = (props: Props) => {

    return(
        <div className="paste-container">
            <h3>{props.paste.author}</h3>
            <h3>{props.paste.title}</h3>
            <p>{props.paste.date}</p>
            <p>{props.paste.content}</p>
        </div>
    )
}

export default Paste;