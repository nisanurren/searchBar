class ConversationService {
  constructor(storageKey = 'conversations') {
    this.storageKey = storageKey;
  }

  getConversations() {
    const conversations = localStorage.getItem(this.storageKey);
    return conversations ? JSON.parse(conversations) : [];
  }

  saveConversation(conversation) {
    const conversations = this.getConversations();
    const index = conversations.findIndex(c => c.id === conversation.id);

    if (index > -1) {
      conversations[index] = conversation; // Update exist conversation
    } else {
      conversations.unshift(conversation); // Add new conversation 
    }

    localStorage.setItem(this.storageKey, JSON.stringify(conversations));
  }

  getConversationById(id) {
    const conversations = this.getConversations();
    return conversations.find(conversation => conversation.id === id);
  }

  deleteConversationById(id) {
    const conversations = this.getConversations();
    const updatedConversations = conversations.filter(conversation => conversation.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedConversations));
    return updatedConversations;
  }
}


export default new ConversationService();