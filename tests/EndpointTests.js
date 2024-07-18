const axios = require('axios')
const data = require('./MockData.json')

Test();

async function Test() {
    console.log('Starting endpoint testing...');

    console.log('Testing user endpoints');
    console.log('Testing user creation');
    for (let i = 0; i < data.users.length; i++) {
        console.log('Testing data: ' + data.users[i]);
        axios.post('http://localhost:8080/users', data.users[i])
            .then(res => { if (!res) console.log('No data returned when creating user'); console.log(res) })
            .catch(err => { console.log('Error when creating user') })
    }
}
