module Api
  class CustomerResource < JSONAPI::Resource
    attributes :name, :email
  end
end
