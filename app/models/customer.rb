class Customer < ApplicationRecord
  has_many :customer_interests
  has_many :feedbacks, through: :customer_interests
  belongs_to :integration

  scope :ranked, -> { order(customer_interests_count: :desc) }

  def remote_url
    integration.remote_url_for(self)
  end
end
