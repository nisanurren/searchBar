import axiosInstance from "./axios";

class Service {
    /**
     * Ask a question to the API
     * @param {string} question - The question to ask
     * @param {array} messageHistory - The chat history
     * @returns {Promise<Object>} The response from the API
     */
    askQuestion(question, messageHistory) {
        return axiosInstance
            .post("/v2/bots/ask-question", { question: question, messageHistory: messageHistory })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
}

export default new Service();
