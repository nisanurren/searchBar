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



    /**
     * Get chat history
     * @param {array} source - The source array [“all”,“zendesk”,“slack”,“discord”,“widget”,“intercom”,“ui”,“api”]
     * @param {number} startEpoch - Start time chat history
     * @param {number} endEpoch - End time chat history
     * @returns {Promise<Object>} The response from the API
     */
    chatHistory({ source, startEpoch, endEpoch }) {
        console.log(source)
        return axiosInstance
            .get("/v2/bots/requests/public", {
                params: {
                    source: source,
                    startEpoch: startEpoch,
                    endEpoch: endEpoch
                }
            })
            .then((response) => {
                console.log(0, response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    },



};

export default Service;
