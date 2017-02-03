class FeedbacksController < ApplicationController
  def new
    @feedback = Feedback.new

    Customer.all.each do |customer|
      @feedback.customer_interests.build(customer: customer)
    end
  end

  def create
    feedback = Feedback.create!(feedback_params)
    redirect_to feedback_state_path(feedback.feedback_state)
  end

  private

  def feedback_params
    params.require(:feedback)
      .permit(
        :description,
        :importance_mutation,
        :tags,
        ticket_ids: [],
        customer_ids: [],
        customer_interests_attributes: [:importance, :customer_id, :_destroy]
      )
      .merge(feedback_state: FeedbackState.first)
  end
end
