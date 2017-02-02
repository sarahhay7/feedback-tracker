class CustomerInterest < ApplicationRecord
  belongs_to :feedback
  belongs_to :customer

  after_initialize :set_default_importance

  private

  def set_default_importance
    self.importance ||= 1
  end
end
