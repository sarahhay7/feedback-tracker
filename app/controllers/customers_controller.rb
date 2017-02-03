class CustomersController < ApplicationController
  def index
    @customers = Customer.ranked
  end
end
