import React, { useEffect, useRef, useState } from "react";
import Button from "./components/Button";
import Conversation from "./components/Conversation";
import ListItem from "./components/ListItem";
import "./styles/App.scss";

const App = () => {
  const [list, setList] = useState([]);
  const [currentConversation, setCurrent] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://ava-challenge-backend.herokuapp.com/");
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ op: "get-all" }));
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.op && data.op === "create") {
        setList([...list, data.created]);
      } else if (data.op === "update") {
        setList(data);
      } else {
        setList(data);
      }
    };
  }, []);

  const removeFromList = (item) => {
    setList(list.filter((val) => val.id !== item.id));
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Conversations</h2>
        <Button current={currentConversation} setCurrent={setCurrent} ws={ws} />
      </div>
      {currentConversation && (
        <Conversation ws={ws} item={currentConversation} />
      )}
      {!currentConversation && (
        <ul>
          {list.map((item) => {
            return (
              <ListItem
                key={item.conversationId}
                item={item}
                list={list}
                setCurrent={setCurrent}
                removeFromList={removeFromList}
                setList={setList}
                ws={ws}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
