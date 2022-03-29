// // Asynchronous (The callback hell problem)
// console.log("Before")
// getUser(1, (user) => {
//     getRepo(user.name, (repo) => {
//         getCommits(repo, (commits) => {
//             console.log(commits)
//         });
//     });
// });
// console.log("After")

// // Synchronous
// console.log("Before");
// const user = getUser(1);
// const repo = getRepo(user.name);
// const commits = getCommits(repo[0]);
// console.log("After");


// Solution to the callback hell problem
// 1 - Use named function instead of anonymous
// getUser(1, getRepos);
// function getRepos(user){
//     getRepos(user.name, getCommits);
// }
// function getCommits(repos) {
//     getCommits(repos, displayCommits);
// }
// function displayCommits(commits){
//     console.log(commits);
// }



// 2 - Promises 
getUserWithPromise(1)
    .then(user => getRepoWithPromise(user.name))
    .then(repos => getCommitsWithPromise(repos[0]))
    .then(commits => console.log('Commits: ', commits))
    .catch(err => console.log('Error: ', err.message));

function getUserWithPromise(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for 2 sec ~~");
            resolve({
                id: id,
                name: 'cutie'
            });
        }, 2000);
    });
}

function getRepoWithPromise(name){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for 2 sec ~~");
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommitsWithPromise(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for 2 sec ~~");
            resolve(['commit']);
        }, 2000);
    });
}


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