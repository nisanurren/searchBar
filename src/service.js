import axiosInstance from "./axios";
import { PassThrough } from 'stream';

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


    async streamRequest(question, messageHistory, callback) {
        const apiKey = import.meta.env.VITE_API_KEY;

        const response = await fetch("https://api-prod.usefini.com/v2/bots/ask-question", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, messageHistory, stream: true })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            let decodedChunk = decoder.decode(value, { stream: true });

            const lines = decodedChunk.trim().split('\n');

            const contents = lines.map(line => {
                try {
                    const jsonString = line.length ? line.split('data: ')[1] : '{"content":""}';
                    const jsonObject = jsonString.length ? JSON.parse(jsonString) : '';
                    return jsonObject.content ?? ' ';
                } catch (error) {
                    return ' ';
                }
            });

            const combinedContents = contents.join('');
            result += combinedContents;

            if (callback) {
                callback(combinedContents);
            }
        }
    }


    askQuestionStream = async (question, chatHistory, callback) => {
        return new Promise((resolve, reject) => {
            try {
                this.streamRequest(question, chatHistory, (contents) => {
                    callback(contents);
                    resolve(contents);
                });
            } catch (error) {
                reject(error);
            }
        });
    };

}

export default new Service();
