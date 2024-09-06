const axios = require('axios');

module.exports = {
  config: {
    name: "fact",
    aliases: ["randomfact", "fact"],
    version: "1.0.0",
    author: "chan",
    role: 0,
    shortDescription: {
      en: "Fetches a random fact."
    },
    longDescription: {
      en: "Fetches a random fact from the API and sends it to the user."
    },
    category: "fun",
    guide: {
      en: "Use {p}fact to fetch a random fact."
    },
    cooldown: 5,
  },
  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (args.length > 0) {
      return api.sendMessage("â€¼ï¸ This command does not require additional arguments.", threadID, messageID);
    }

    api.sendMessage("âš™ï¸ Fetching a random fact for you...", threadID, messageID);

    try {
      const response = await axios.get('https://nash-rest-api-production.up.railway.app/fact');
      const fact = response.data;

      if (!fact || !fact.fact) {
        return api.sendMessage("â˜¹ï¸ Sorry, I couldn't fetch a fact at the moment.", threadID, messageID);
      }

      api.sendMessage(`ðŸ‘ Here's a random fact for you:\n\n${fact.fact}`, threadID, messageID);
    } catch (error) {
      console.error("âŒ Error fetching fact:", error);
      api.sendMessage(`An error occurred: ${error.message}`, threadID, messageID);
    }
  }
};