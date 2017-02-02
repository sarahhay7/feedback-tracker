class Feedback < ApplicationRecord
  belongs_to :feedback_state
  has_many :ticket_interests
  has_many :customer_interests
  has_many :tickets, through: :ticket_interests
  has_many :customers, through: :customer_interests
end
