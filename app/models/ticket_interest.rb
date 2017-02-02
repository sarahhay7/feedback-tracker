class TicketInterest < ApplicationRecord
  belongs_to :feedback
  belongs_to :ticket
end
