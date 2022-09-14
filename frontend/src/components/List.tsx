import React, { useEffect, useState } from "react";
import axios from "axios";
const List = () => {
    const [list, setList] = useState(null as any);
    useEffect(() => {
        axios.get("http://localhost:4000/").then(res => setList(res.data));
    })
    return(
        <div>
        {list.map((paste: any) => (
            <h1>{paste.author}</h1>
            <h1>{paste.date}</h1>
            <h1>{paste.title}</h1>
            <h1>{paste.content}</h1>
          ))}
          </div>
    )
}
export default List;