require 'rails_helper'

RSpec.feature "Add Feedback" do
  scenario "As a user, I can add feedback" do
    feedback_state = create(:feedback_state)
    visit new_feedback_path
    fill_in "Description", with: "Needs more laser cats"
    click_on "Save"
    expect(page).to have_content "Needs more laser cats"
  end
end
