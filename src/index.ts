import { version } from 'process';

if (parseInt(version.slice(1).split('.')[0], 10) < 22) {
  console.error('Error: Node Version 22 or Higher Is Required');
  process.exit(1);
}

require('dotenv').config();
import cron from 'node-cron';

import { CONFIG } from '@/constants';
import { connectDatabase, discord } from '@/lib/clients';
import { announceBirthdays, register } from '@/helpers';
import { onInteractionCreate } from '@/events';

const addEventListeners = async () => {
  discord.on('interactionCreate', onInteractionCreate);

  console.log('CapybaraBot: Discord.js Event Listeners Added');
};

const addScheduledTasks = async () => {
  if (CONFIG.FEATURES.BIRTHDAY.ENABLED) {
    cron.schedule('0,30 * * * *', async () => {
      await announceBirthdays();
    });
  }

  console.log('CapybaraBot: Scheduled Tasks Added');
};

const init = async () => {
  await connectDatabase();
  await addEventListeners();
  await addScheduledTasks();
};

if (process.env.REGISTER) register();

init();
