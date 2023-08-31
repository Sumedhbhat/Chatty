import { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const [data, setData] = useState();
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    await axios
      .get("/api/chat")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        w="100%"
        h="91.5vh"
        p="10"
      >
        {user && <MyChats />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
