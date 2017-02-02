module Api
  class FeedbackResource < JSONAPI::Resource
    attributes :description
    has_many :tickets
  end
end
