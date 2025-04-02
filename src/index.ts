import { version } from 'process';

if (parseInt(version.slice(1).split('.')[0], 10) < 22) {
  console.error('Error: Node Version 22 or Higher Is Required');
  process.exit(1);
}

require('dotenv').config();

import { discord } from '@/lib/clients';
import { register } from '@/helpers';
import { onInteractionCreate } from '@/events';

const addEventListeners = async () => {
  discord.on('interactionCreate', onInteractionCreate);

  console.log('CapybaraBot: Discord.js Event Listeners Added');
};

const init = async () => {
  await addEventListeners();
};

if (process.env.REGISTER) register();

init();
