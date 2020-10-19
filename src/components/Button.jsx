import React, { useEffect, useState } from "react";
import "../styles/Button.scss";

const Button = ({ current, setCurrent, ws }) => {
  const [text, setText] = useState("Start Conversation");
  const [newId, setNewId] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (current) {
      setText("Back");
    }
  });

  const handleButton = () => {
    if (!current) {
      setCreating(true);
    } else {
      setCurrent(() => null);
      setText("Start Conversation");
    }
  };

  const handleCreate = () => {
    ws.current.send(
      JSON.stringify({
        op: "create",
        creation: {
          author: "bob",
          conversationId: newId,
          data: {
            index: 0,
            length: null,
            text: "",
            type: "insert",
          },
          origin: {
            alice: 0,
            bob: 0,
          },
        },
      })
    );
    setCreating(false);
  };

  return (
    <>
      <button onClick={() => handleButton()}>{text}</button>
      {creating && (
        <div className="create">
          <div className="input">
            <label>Enter id:</label>
            <input onChange={(e) => setNewId(e.target.value)} type="text" />
          </div>
          <div className="buttons">
            <button onClick={handleCreate}>Create</button>
            <button onClick={() => setCreating(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Button;
