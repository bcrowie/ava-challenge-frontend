import React from "react";
import trash from "../icons/trash.svg";
import "../styles/ListItem.scss";

const ListItem = ({ item, setCurrent, removeFromList, ws }) => {
  const { id } = item;

  const handleDelete = (item) => {
    ws.current.send(JSON.stringify({ op: "delete", item }));
    removeFromList(item);
  };

  return (
    <li>
      <button onClick={() => setCurrent(item)}>
        <p>{id}</p>
      </button>
      <img onClick={() => handleDelete(item)} src={trash} alt="delete" />
    </li>
  );
};

export default ListItem;
