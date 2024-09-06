const axios = require('axios');

module.exports = {
  config: {
    name: "joke",
    aliases: ["funny", "humor"],
    version: "1.0.0",
    author: "chan",//change credit if crush moko
    role: 0,
    shortDescription: {
      en: "Fetches a random joke."
    },
    longDescription: {
      en: "Fetches a random joke from an external API and sends it to you."
    },
    category: "fun",
    guide: {
      en: "Use {p}joke to get a random joke."
    },
    cooldown: 5,
  },
  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    api.sendMessage("âš™ï¸ Fetching a joke for you...", threadID, messageID);

    try {
      const response = await axios.get('https://nash-rest-api-production.up.railway.app/joke');
      const joke = response.data.joke;

      if (joke) {
        api.sendMessage({
          body: `ðŸ¤£ Here's a corny joke for you: \n\n ðŸ˜${joke}`,
        }, threadID, messageID);
      } else {
        api.sendMessage("â˜¹ï¸Sorry, I couldn't fetch a joke at the moment.", threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`Error: ${error.message}`, threadID, messageID);
    }
  }
};