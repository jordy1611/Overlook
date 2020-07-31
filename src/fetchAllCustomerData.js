function fetchAllCustomerData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(data => {
      return data.users
    })
    .catch(err => console.log(err.message))
}

export default fetchAllCustomerData
