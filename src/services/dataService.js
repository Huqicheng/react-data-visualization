/*
* Fake data
*/

/**
* Get the list of accounts
* return {Array} - the list of accounts
*/
module.exports.getAccounts = function () {
    const accounts = [
        {id: 0, parent: null, name: 'Account 0'},
        {id: 1, parent: 0   , name: 'Account 1'},
        {id: 2, parent: 0   , name: 'Account 2'},
        {id: 3, parent: 0   , name: 'Account 3'},
        {id: 4, parent: 1   , name: 'Account 4'},
        {id: 5, parent: 1   , name: 'Account 5'},
        {id: 6, parent: 1   , name: 'Account 6'},
        {id: 7, parent: 2   , name: 'Account 7'},
        {id: 8, parent: 3   , name: 'Account 8'},
        {id: 9, parent: 4   , name: 'Account 9'}
    ];
 
    return accounts;
 };
 
 /**
 * Get the list of cleanings
 * return {Array} - the list of cleanings
 */
 module.exports.getCleanings = function () {
    const cleanings = [];
 
    for (let i = 0; i < 100; i++) {
        cleanings.push({
            id: i,
            account: Math.floor(Math.random() * 10),
            robot: Math.floor(Math.random() * 10),
            area: Math.floor(Math.random() * 100),
            time: Math.floor(Math.random() * 1000)
        });
    }
 
    return cleanings;
 }
 