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
// Three ways to handle Asynchronous code
// - Callbacks
// - Promises
// - Async/Await

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
// getUserWithPromise(1)
//     .then(user => getRepoWithPromise(user.name))
//     .then(repos => getCommitsWithPromise(repos[0]))
//     .then(commits => console.log('Commits: ', commits))
//     .catch(err => console.log('Error: ', err.message)); // This handler will catch all the errors in the chain


// 3 - Async and Await approach
async function displayCommits() {
    try {
        // Syntax sugar, it's still the same with the chaining approach above
        const user = await getUserWithPromise(1); // A thread is released to do other work once this is called
        const repos = await getRepoWithPromise(user.name);
        const commits = await getCommitsWithPromise(repos[1]);
        console.log(commits);
    } catch (err) {
        console.log('ERROR: ', err.message);
    }
}
displayCommits();

function getUserWithPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for 2 sec to get user ~~");
            resolve({
                id: id,
                name: 'cutie'
            });
        }, 2000);
    });
}
function getRepoWithPromise(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for 2 sec to get repo ~~");
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error("Error getting repo."));
        }, 2000);
    });
}
function getCommitsWithPromise(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for 2 sec to get commits ~~");
            resolve(['commit']);
        }, 2000);
    });
}
function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading from db .. 2 sec!");
        callback({
            id: id,
            name: 'cutie'
        });
    }, 2000) // Schedule time 
}
function getRepo(name, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000)
}