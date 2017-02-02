class FeedbacksController < ApplicationController
  def new
    @feedback = Feedback.new
  end

  def create
    feedback = Feedback.create!(feedback_params)
    redirect_to feedback_state_path(feedback.feedback_state)
  end

  private

  def feedback_params
    params.require(:feedback)
      .permit(:description, ticket_ids: [], customer_ids: [])
      .merge(feedback_state: FeedbackState.first)
  end
end
