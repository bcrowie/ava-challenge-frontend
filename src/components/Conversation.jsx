import React, { useEffect, useState } from "react";
import "../styles/Conversation.scss";

const Conversation = ({ item, ws }) => {
  const [textState, setText] = useState();

  const handleChange = (e) => {
    ws.current.send(
      JSON.stringify({ op: "mutate", item, value: e.target.value })
    );
    setText(e.target.value);
  };

  useEffect(() => {
    setText(item.text);
  }, []);

  return (
    <div>
      <textarea
        onChange={(e) => handleChange(e)}
        name="text"
        id="input"
        cols="30"
        rows="10"
        value={textState}
      />
    </div>
  );
};

export default Conversation;
