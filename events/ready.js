const config = require("../config.json");
const Discord = require("discord.js");
const numbers = require("../utils/numbers.js")

module.exports = async (client) => {
  console.log(`[INFO] ${client.user.username} has succesfully started!`);
  client.user.setStatus(`${client.config.status}`);
  let statuses = config.statuses;
  setInterval(function() {
    let shardId = client.shard.id + 1;
    let statusRaw = statuses[Math.floor(Math.random() * statuses.length)];
    let status = statusRaw.replace("%prefix%", config.prefix).replace("%guilds%", numbers.data.numberWithCommas(client.guilds.size)).replace("%users%", numbers.data.numberWithCommas(client.users.size)).replace("%shardId%", shardId.toString()).replace("%shardCount%", client.shard.count.toString());
    client.user.setActivity(status, {type: "WATCHING"});
  }, 5000);

  let embed = new Discord.RichEmbed()
  .setTitle("Bot started")
  .setColor(config.mainColor)
  .setDescription("Tanoshii has started.")
  .setFooter(config.name);
  client.users.get("228965621478588416").send(embed);

  client.guilds.forEach(async (guild) => {
    let invite = await guild.channels.filter((channels) => channels.type === "text").first().createInvite(false, 600, 1, false);
    console.log("[INFO] " + guild.name + ": https://discord.gg/" + invite.code);
  });

};
