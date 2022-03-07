console.log("Before")
getUser(1, (user) => {
    // get name
    console.log('User', user);

    // get repo
    getRepo(user.name, (repo) => {
        console.log('Repo', repo);
    })

});
console.log("After")

// 3 ways to handle Asynchronous code
// - Callbacks
// - Promises
// - Async/Await

function getUser(id, callback){
    setTimeout(() => {
        console.log("Reading from db .. 2 sec!");
        callback({
            id: id, 
            name: 'cutie'
        });
    }, 2000) // Schedule time 
}

function getRepo(name, callback){
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000)
}