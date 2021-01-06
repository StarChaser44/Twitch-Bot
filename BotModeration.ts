import { client } from './bot'
let emoteOnly = false;
let followerOnly = false;

//This function will timeout a user from the chat room
export function timeoutUser(channel_name : string, username : string, length : number, reason : string) : void {
    client.timeout(channel_name, username, 300, reason)
    .then((data) => {
        console.log(data);
        // data returns [channel, username, seconds, reason]
    }).catch((err) => {
        console.log('There was an error timing out someone');
        console.log(err);
    });
}

//This funtion will toggle on and off emote only mode when executed
export function toggleEmoteMode (channel_name : string) : void{
if(emoteOnly == false) {
    emoteOnly = true;
    client.emoteonly(channel_name)
    .then((data) => {
    client.say(channel_name, "The chat is now in emote only mode");
    console.log("The chat is now in emote only mode");
    console.log('data:', data);
    }).catch((err) => {
        console.log('There was an error going into emote only mode');
        console.error(err);
    });
}else {
        emoteOnly = false;
        client.emoteonlyoff(channel_name)
        .then((data) => {
            console.log(data);
            client.say(channel_name, 'The chat has left emote only mode');
            console.log('The chat has left emote only mode');
        }).catch((err) => {
            console.log('There was an error leaving emote only mode');
            console.error(err);
        });
    }
}

//This function will ban a user from chatting in the chat room
export function banUser(channel_name : string, user : string, reason : string) : void {
    client.ban(channel_name, user, reason)
    .then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log('There was an error banning the user');
        console.log(err);
    });
}

//This function will toggle on and off follower only mode for the chat
export function followerOnlyToggle(channel_name : string, duration : number) : void { 
    if(followerOnly == false) {
        followerOnly = true;
        client.followersonly(channel_name, duration)
        .then((data) => {
        console.log(data);
        }).catch((err) => {
        console.log("There was an error going into follower only mode");
        console.log(err);
        });
    }else {
        followerOnly = false;
        client.followersonlyoff(channel_name)
        .then((data) => {
        console.log(data);
        }).catch((err) => {
        console.log('There was an error leaving follower only mode');
        console.log(err);
        });
}
}
