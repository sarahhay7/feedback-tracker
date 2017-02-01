class FeedbacksController < ApplicationController
  def new
    @feedback = Feedback.new
  end

  def create
    Feedback.create!(feedback_params)
  end

  private

  def feedback_params
    params.require(:feedback).permit(:description)
      .merge(feedback_state: FeedbackState.first)
  end
end
