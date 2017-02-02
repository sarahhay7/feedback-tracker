class Customer < ApplicationRecord
  has_many :customer_interests
  has_many :feedbacks, through: :customer_interests
  belongs_to :integration
end
