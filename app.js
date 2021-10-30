#!/usr/bin/node

let klient;

var defaultCallback = async function(guilds) {
	guilds.forEach(async guild => {
		let channel = guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").first();
		await channel.send(`봇이 NASM 정책을 위반하여 서버를 나가겠습니다.\n해결 방안: 이 봇을 제외한 모든 봇들을 추방하고 다시 초대하세요.\n초대 링크: https://discord.com/api/oauth2/authorize?client_id=${klient.user.id}&permissions=8&scope=applications.commands%20bot\n@everyone`);
		guild.leave();
		console.log("Guild " + guild.name + " violate the NASM policy!");
	});
}

module.exports = function(client, callback = defaultCallback) {
	guilds = [];
	klient = client;
	client.on("ready", () => {
		client.guilds.cache.forEach(guild => {
			let pushed = false;
			guild.members.cache.forEach(member => {
				if (member.user.id != client.user.id && member.user.bot) {
					if (!pushed) {
						guilds.push(guild);
						pushed = true;
					}
				}
			});
		});
		callback(guilds);
	});
	client.on("guildCreate", guild => {
		let pushed = false;
		guild.members.cache.forEach(member => {
			if (member.user.id != client.user.id && member.user.bot) {
				if (!pushed) {
					callback([guild]);
				}
			}
		});
	});
	client.on("guildMemberAdd", member => {
		if (member.user.id != client.user.id && member.user.bot) {
			callback([member.guild]);
		}
	});
};

