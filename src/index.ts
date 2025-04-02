import { version } from 'process';

if (parseInt(version.slice(1).split('.')[0], 10) < 22) {
  console.error('Error: Node Version 22 or Higher Is Required');
  process.exit(1);
}

require('dotenv').config();

import { discord } from '@/lib/clients';

console.log(!!discord);

const addEventListeners = async () => {
  // discord.on('interactionCreate', de.onInteractionCreate.bind(null, state));

  console.log('CapybaraBot: Discord.js Event Listeners Added');
};

const init = async () => {
  await addEventListeners();
};

init();
