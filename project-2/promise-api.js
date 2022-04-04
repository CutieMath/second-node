// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// const p = Promise.reject(new Error("Error message"));
// p.catch(e => console.log(e))

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation 01...');
        resolve("Op1 Res");
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation 02...');
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(res => console.log(res))