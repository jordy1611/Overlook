function postNewBooking(booking) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking),
  })
    .then(response => response.json())
    .then(json => console.log('Request success: ', json))
    .catch(err => console.log(err.message))
}


export default postNewBooking;
