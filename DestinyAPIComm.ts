//The below code is for the Destiny API, currently investigating socket hang up issue
// const Destiny_Two_API_Key = '94e8dc99ed2444a4b01c23153bb11065';
// const Bungie_Auth_URL = 'https://www.bungie.net/en/OAuth/Authorize';
// const Bungie_Server_Endpoint = 'www.bungie.net';
/*
console.log("Requesting a user from bungie");
search_bungie_database_for_user('starlessjupiter');
function search_bungie_database_for_user(userName : string)  : void {
  const options = {
    hostname: Bungie_Server_Endpoint,
    path: `/Platform/User/SearchUsers/?q=${userName}`,
    method: 'GET',
    headers: {
      'X-API-Key' : '94e8dc99ed2444a4b01c23153bb11065'
    }
  };
  const requestUser = http.request(options, (res : any) => {
    console.log('Here too');
    console.log(`STATUS ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (dataChunk : string) => {
      console.log(`BODY: ${dataChunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response');
    });
    res.end();
  });
}
*/