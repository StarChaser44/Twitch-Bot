import {toggleEmoteMode, timeoutUser, followerOnlyToggle} from './BotModeration'
import { getFunFact } from './FunFactAPIComm'
import './DestinyAPIComm'
import './FunFactAPIComm'
const tmi = require('tmi.js');
const opts = {
  identity: {
    username: 'llamalavabot',
    password: 'oauth:',
  },
  channels: [ 'starlessjupiter'] 
}
// const Destiny_Two_API_Key = '94e8dc99ed2444a4b01c23153bb11065';
// const Bungie_Auth_URL = 'https://www.bungie.net/en/OAuth/Authorize';
// const Bungie_Server_Endpoint = 'www.bungie.net';
export const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect(); //Connect to twitch servers

const blocked_words : string[] = ['Poop', 'balls', 'simp'];
function onMessageHandler(channel_name : string, context, msg, self) : void {
  if(self) { return } // We want to ignore messages from ourselves

  const message : string = msg.trim();
  checkBlockedWords(channel_name, context, msg);
  const command : string = message.split(' ')[0]; 
  switch(command) {
    case '!dice': {
      const randNum : number = rollDice();
      client.say(channel_name, `You rolled a ${randNum}`);
      console.log('The dice command has been activated');
      break;
    }
    case '!uptime': {
      console.log('Getting the uptime');
      break;
    }
    case '!emote': {
      console.log('Toggling emote mode');
      if(context.username != 'starlessjupiter'){
        client.say(channel_name, ` @${context.username}, sorry only the streamer can access this command`);
        console.log('Invalid person\'s tried to access the emote mode');
      }else {
        console.log('Here');
        toggleEmoteMode(channel_name);
      }
      break;
    }
    case '!follower': {
      if(context.username != 'starlessjupiter') {
        client.say(channel_name, `@${context.username}, sorry only the user can access this command`);
        console.log('Invalid person\'s tried to access the follower mode');
      } else {
        console.log("Toggling follower only mode");
        const time_limit = parseInt(message.split(' ')[1]);
        followerOnlyToggle(channel_name, time_limit);
      }
      break;
    }
    case '!timeout' : {
      const timeout_config = message.split(' ');
      if(timeout_config.length != 4) {
        console.log('Invalid arguements');
        break;
      }
      const user = timeout_config[1];
      const duration = timeout_config[2];
      const reason = timeout_config[3];
      timeoutUser(channel_name, user, parseInt(duration), reason);
      break;
    }
    case '!funfact': {
      getFunFact(channel_name);
      break;
    }
    default: {
      console.log('The command was unrecognized');
    }
  }
}

function checkBlockedWords(channel_name : string, context, message) : void {
  const shouldSendMessage = blocked_words.some(blocked_word => message.includes(blocked_word.toLowerCase()));
  if(context.username == 'starlessjupiter') return;
  if(shouldSendMessage) {
    client.say(channel_name, `@${context.username}, please do not say mean words in chat!`);
    //delete the message from the chat
    client.deletemessage(channel_name, context.id);
  }
}


function rollDice() : number {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1; 
}

function onConnectedHandler(addr, port) : void{
  console.log(`Connected to ${addr}:${port}`);
}
