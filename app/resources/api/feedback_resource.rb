module Api
  class FeedbackResource < JSONAPI::Resource
    attributes :description, :importance_mutation, :weighting, :tags
    belongs_to :feedback_state
    has_many :customers
    has_many :tickets
  end
end
