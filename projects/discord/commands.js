const { REST, Routes }  = require('discord.js');
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
const rest = new REST({ version: '10' }).setToken('MTI1MjYyMzE3MTA2OTI4MDM5Ng.GoV4Th.CgOoAP2kLvyskgx2_WmC6Quw-8gFAsmYbGVA3I');
(async () => {
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands('1252623171069280396'), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

})();