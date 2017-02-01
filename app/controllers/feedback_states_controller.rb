class FeedbackStatesController < ApplicationController
  def show
    @feedback_state = FeedbackState.find(params[:id])
  end
end
