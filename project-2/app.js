console.log("Before")
const user = getUser(1);
console.log(user);
console.log("After")

// 3 ways to handle Asynchronous code
// - Callbacks
// - Promises
// - Async/Await


function getUser(id){
    setTimeout(() => {
        console.log("Reading from db .. 2 sec!");
        return {
            id: id, 
            name: 'cutie'
        };
    }, 2000) // Schedule time 
    return 1;
}