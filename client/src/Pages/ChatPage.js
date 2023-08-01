import { useState, useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    await axios
      .get("/api/chat")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  return <div>{data && data.map((d) => <div>{d.chatName}</div>)}</div>;
};

export default ChatPage;
