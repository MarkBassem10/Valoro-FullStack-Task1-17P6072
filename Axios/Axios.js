var axios = require("axios").default;



var Teams = {
  method: 'GET',
  url: 'https://football-web-pages1.p.rapidapi.com/team.json',
  params: {comp: '1', team: '3'},
  headers: {
    'x-rapidapi-host': 'football-web-pages1.p.rapidapi.com',
    'x-rapidapi-key': '5203a01285msh10c81bd5de3c8b4p156a5cjsn599e75847e06'
  }
};



axios.request(Teams).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

