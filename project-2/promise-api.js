// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

const p = Promise.reject(new Error("Error message"));
p.catch(e => console.log(e))
