module.exports = {
	config: {
		name: "kick",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			vi: "Kick thÃ nh viÃªn khá»i box chat",
			en: "Kick member out of chat box"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} @tags: dÃ¹ng Ä‘á»ƒ kick nhá»¯ng ngÆ°á»i Ä‘Æ°á»£c tag",
			en: "   {pn} @tags: use to kick members who are tagged"
		}
	},

	langs: {
		vi: {
			needAdmin: "Vui lÃ²ng thÃªm quáº£n trá»‹ viÃªn cho bot trÆ°á»›c khi sá»­ dá»¥ng tÃ­nh nÄƒng nÃ y"
		},
		en: {
			needAdmin: "Please add admin for bot before using this feature"
		}
	},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply(getLang("needAdmin"));
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};