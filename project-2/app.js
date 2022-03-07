console.log("Before")
getUser(1, function(user){
    console.log('User', user);
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