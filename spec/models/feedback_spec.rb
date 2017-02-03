require 'rails_helper'

RSpec.describe Feedback do
  it "has a weighting that aggregates importance" do
    feedback = create(:feedback)

    expect { create(:customer_interest, feedback: feedback, importance: 1) }
      .to change { feedback.reload.weighting }.from(0).to(1)

    expect { create(:customer_interest, feedback: feedback, importance: 3) }
      .to change { feedback.reload.weighting }.to(4)

    expect { feedback.update(importance_mutation: -5) }
      .to change { feedback.reload.weighting }.to(-1)
  end
end
