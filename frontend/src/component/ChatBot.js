import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import { HashLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import Footer from './Footer';

const ChatBot = () => {

  let Color = useSelector((state) => state.bodyColor.color)
  let message = useSelector((state) => state.message.message);
  const loader = useSelector((state) => state.UniversalLoader.UniversalLoader)

  const msgEnd = useRef(null)
  useEffect(() => {
    msgEnd.current.scrollIntoView()
  }, [message])

  return (
    <div className="card card-dark direct-chat direct-chat-primary" style={{ height: '97vh' }}>
      <div className="card-header">
        <ChatHeader />
      </div>
      <div className="card-body" style={{ backgroundColor: Color }}>
        <div className="direct-chat-messages" style={{ height: '100%' }}>
          <Chat />
          {loader === true && <HashLoader color="black" size={'25px'} />}
          <div ref={msgEnd} />
        </div>
      </div>
      <div className="card-footer" style={{ backgroundColor: Color }}>
        <Footer />
      </div>
    </div>
  );
}

export default ChatBot;
