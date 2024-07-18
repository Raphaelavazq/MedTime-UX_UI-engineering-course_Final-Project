import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchChatbotResponse } from '../fetchSymptoms';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './chatbot.css';
import botAvatar from '../assets/images/chatbot5.png';
import userAvatar from '../assets/images/profile.png';
import chatIcon from '../assets/images/chatbot1.gif';
import medieAvatar from '../assets/images/chatbot5.png'; // Make sure you have this image

const quickReplies = [
  'What should I do if I have a fever?',
  'Can you tell me about seasonal allergies?',
  'How can I reduce stress and anxiety?',
  'How can I improve my sleep quality?',
  'What are the best practices for a healthy diet?'
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const chatLogRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
    setShowQuickReplies(false);

    try {
      const response = await fetchChatbotResponse(userInput);
      setMessages([...newMessages, { text: response, sender: 'bot' }]);
    } catch (error) {
      setMessages([...newMessages, { text: 'Error: Unable to fetch response', sender: 'bot' }]);
    }
  };

  const handleQuickReply = async (reply) => {
    const newMessages = [...messages, { text: reply, sender: 'user' }];
    setMessages(newMessages);
    setShowQuickReplies(false);

    try {
      const response = await fetchChatbotResponse(reply);
      setMessages([...newMessages, { text: response, sender: 'bot' }]);
    } catch (error) {
      setMessages([...newMessages, { text: 'Error: Unable to fetch response', sender: 'bot' }]);
    }
  };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <Draggable>
        <img
          src={chatIcon}
          alt="Chat Icon"
          className={`chat-icon ${isOpen ? 'hidden' : ''}`}
          onClick={() => setIsOpen(true)}
        />
      </Draggable>
      {isOpen && (
        <Draggable handle=".chat-header">
          <ResizableBox width={400} height={600} minConstraints={[300, 400]} maxConstraints={[800, 800]}>
            <div className="chat-container">
              <div className="chat-header">
                <img src={medieAvatar} alt="Medie Avatar" className="medie-avatar" />
                <div className="chat-intro ">
                  Hi there! <br />I’m Medie, your friendly health assistant here at MedTime. 
                </div>
                <button onClick={() => setIsOpen(false)} className="close-button">X</button>
              </div>
              <div className="chat-body">
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.sender}`}>
                    {msg.sender === 'bot' && <img src={botAvatar} alt="Bot Avatar" className="avatar" />}
                    <div className="message">{msg.text}</div>
                    {msg.sender === 'user' && <img src={userAvatar} alt="User Avatar" className="avatar" />}
                  </div>
                ))}
                <div ref={chatLogRef} />
              </div>
              {showQuickReplies && (
                <div className="quick-replies">
                  {quickReplies.map((reply, index) => (
                    <button key={index} onClick={() => handleQuickReply(reply)}>{reply}</button>
                  ))}
                </div>
              )}
              <form onSubmit={handleSubmit} className="chat-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message ..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </ResizableBox>
        </Draggable>
      )}
    </>
  );
};

Chatbot.propTypes = {
  fetchChatbotResponse: PropTypes.func,
};

export default Chatbot;