// Call back hell method
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// My new Async method
async function sendEmailToCustomers() {
  try {
    const cus = await getCustomer(1);
    const topMovies = await getTopMovies();
    const sendEmailRes = await sendEmail(cus.email, topMovies);
    console.log(sendEmailRes)
  } catch (err) {
    console.log('ERROR: ', err.message);
  }
}
sendEmailToCustomers();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Waiting for 4 sec to get customer ~~");
      resolve({
        id: 1,
        name: 'CutieMath',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Waiting for 4 sec to get movies ~~");
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Waiting for 4 sec to send email ~~");
      resolve("Email sent ~~");
    }, 4000);
  });
}