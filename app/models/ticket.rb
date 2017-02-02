class Ticket < ApplicationRecord
  has_many :ticket_interests
  has_many :feedbacks, through: :ticket_interests
end
