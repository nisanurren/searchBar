export const getConversations = () => {
    const conversations = localStorage.getItem('conversations');
    return conversations ? JSON.parse(conversations) : [];
  };
  
  export const saveConversation = (conversation) => {
    const conversations = getConversations();
    const index = conversations.findIndex(c => c.id === conversation.id);
    
    if (index > -1) {
      conversations[index] = conversation; // Update current chat
    } else {
      conversations.push(conversation); // Add new chat
    }
  
    localStorage.setItem('conversations', JSON.stringify(conversations));
  };
  
  export const getConversationById = (id) => {
    const conversations = getConversations();
    return conversations.find(conversation => conversation.id === id);
  };
  