import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";

const Messenger = () => {
  const signedInUser = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/conversations/${signedInUser.id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [signedInUser.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentChat._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: signedInUser.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
      inputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="flex max-w-7xl mx-auto p-2">
        <div className=" flex-[30%] h-[calc(100vh-95px)] bg-gray-50 ">
          {conversations?.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} signedInUser={signedInUser} />
            </div>
          ))}
        </div>
        <div className=" flex-[70%] border border-gray-300 relative p-2 ">
          {messages?.map((m) => (
            <Message message={m} />
          ))}

          {!currentChat && (
            <div className="flex h-full justify-center items-center">
              <h2 className=" text-2xl">Select a Conversation!</h2>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 w-[98%] border-t-2 border-black p-2 bg-white  "
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full p-2 outline-none"
                onChange={(e) => setNewMessage(e.target.value)}
                ref={inputRef}
              />
              <button
                type="submit"
                className=" absolute right-0 mt-2 bg-blue-400 text-white w-20 p-1 rounded-md hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messenger;
