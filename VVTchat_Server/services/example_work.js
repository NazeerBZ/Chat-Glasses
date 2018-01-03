// mongoose stuff goes here
// a service should always return a promise
module.exports = (name) => {
    return new Promise((resolve, reject) => {
        if (name == 'example'){
            // resolve('Hello World'); bad if you don't want anything else to run after this
            console.log('This will execute!'); // it will run if above call is not returned
            return resolve('Hello World'); // good
        }
        else{ // if something goes wrong
            // reject('A sample error')         !! BAD !!
            // reject({error: 'A sample error'}) !! BAD !!
            return reject(new Error('A sample error')); // good
        }
    })
}