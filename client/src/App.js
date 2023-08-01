import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/chats" element={<ChatPage />} />
      <Route path="*" element={<h1> Not Found</h1>} />
    </Routes>
  );
};

export default App;
