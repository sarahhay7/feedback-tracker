require 'rails_helper'

RSpec.feature "Add Feedback" do
  scenario "As a user, I can add feedback" do
    feedback_state = create(:feedback_state)
    create(:ticket, title: 'Inadequate laser cat sanctuary')
    create(:customer, name: 'Admiral Spaceship')
    visit new_feedback_path

    fill_in "Description", with: "Needs more laser cats"
    check 'Inadequate laser cat sanctuary'
    check 'Admiral Spaceship'
    click_on "Save"

    expect(page).to have_content "Needs more laser cats"
    expect(page).to have_link 'Inadequate laser cat sanctuary'
    expect(page).to have_link 'Admiral Spaceship'
  end
end
