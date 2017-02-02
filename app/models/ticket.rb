class Ticket < ApplicationRecord
  has_many :ticket_interests
  has_many :feedbacks, through: :ticket_interests
  belongs_to :integration

  def remote_url
    integration.remote_url_for(self)
  end
end
