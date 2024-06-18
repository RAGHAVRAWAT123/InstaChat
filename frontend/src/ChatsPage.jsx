import React from 'react';
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced';

const ChatsPage = (props) => {
  const { username, secret } = props.user; // Destructure username, secret, and password from props

  const chatProps = useMultiChatLogic(
    '7aaf184f-a49c-418e-b43d-7b77cab984f6',
    username,
    secret
    
  );

  return (
    <div style={{ height: '100vh' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: '100%' }} />
    </div>
  );
}

export default ChatsPage;
