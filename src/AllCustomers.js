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
