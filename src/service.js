import axiosInstance from "./axios";

const Service = {
    /**
     * Ask a question to the API
     * @param {string} question - The question to ask
     * @param {array} messageHistory - The chat history
     * @returns {Promise<Object>} The response from the API
     */
    askQuestion(question) {
        return axiosInstance
            .post("/v2/bots/ask-question", { question: question })
            .then((response) => {
                console.log(0, response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    },
};

export default Service;
