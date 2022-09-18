import React, { useEffect, useState } from "react";
import axios from "axios";
import Paste from "./Paste/Paste";
import { Paste as TypePaste } from "../interface";

const List = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/").then((res) => setList(res.data));
  }, []);
  return (
    <div>
      {list.map((paste: any) => (
        <>
          <Paste paste={paste} key={paste.id}/>
        </>
      ))}
    </div>
  );
};
export default List;
