const axios = require("axios");
const { GoatWrapper } = require('fca-liane-utils');
module.exports = {
  config: {
    name: 'sim',
    aliases: ['sim'],
    version: '1.0',
    author: 'Lorenzo',
    countDown: 3,
    role: 0,
    description: 'Chat with chatbot',
    longDescription: 'sim your message',
    category: 'fun',
    guide: '{pn}',
  },

onStart: async function ({ api, event, args, reply }) {
  try {
	 let message = args.join(" ");
	 if (!message) {
		return api.sendMessage(`please put a message`, event.threadID, event.messageID);
	 }

	 const response = await axios.get(`https://sim-and-teach-api.onrender.com/sim?query=${message}`);
	 const respond = response.data.respond;
	 api.sendMessage(respond, event.threadID, event.messageID);
  } catch (error) {
	 console.error("An error occurred:", error);
	 api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
  }
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: false });