class Feedback < ApplicationRecord
  belongs_to :feedback_state
  has_many :ticket_interests
  has_many :customer_interests, inverse_of: :feedback
  has_many :tickets, through: :ticket_interests
  has_many :customers, through: :customer_interests
  accepts_nested_attributes_for :customer_interests, allow_destroy: true

  def weighting
    customer_interests.sum(:importance) + importance_mutation
  end
end
