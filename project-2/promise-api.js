// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// const p = Promise.reject(new Error("Error message"));
// p.catch(e => console.log(e))

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation 01...');
        reject(new Error("Simulate error ~"));
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation 02...');
        resolve(2);
    }, 2000);
});

// If one fail, the entire call will be considered rejected
// Promise.all([p1, p2])
//     .then(res => console.log(res))
//     .catch(err => console.log("Error: ", err.message))

// If one fulfilled, as soon as the first finish the second one will be ignored
Promise.race([p1, p2])
    .then(res => console.log(res))
    .catch(err => console.log("Error: ", err.message))