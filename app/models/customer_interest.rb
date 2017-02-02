class CustomerInterest < ApplicationRecord
  belongs_to :feedback
  belongs_to :customer
end
