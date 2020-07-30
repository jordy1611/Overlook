// import Customer from '../src/Customer'
/*Array of user objects
one property which is users
method return current user based on id
return user based on name*/
class AllCustomers {
  constructor(customers) {
    this.customers = customers
  }

  findCustomerById(id) {
    return this.customers.find(customer => customer.id === id)
  }

  findCustomerByName(name) {
    return this.customers.find(customer => customer.name === name)
  }
}

export default AllCustomers
