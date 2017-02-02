class Feedback < ApplicationRecord
  belongs_to :feedback_state
  has_many :ticket_interests
  has_many :tickets, through: :ticket_interests
end
