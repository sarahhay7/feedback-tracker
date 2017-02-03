require 'rails_helper'

RSpec.feature "Add Feedback" do
  scenario "As a user, I can add feedback" do
    feedback_state = create(:feedback_state)
    create(:ticket, title: 'Inadequate laser cat sanctuary')
    create(:customer, name: 'Admiral Spaceship')
    visit new_feedback_path

    fill_in "Description", with: "Needs more laser cats"
    fill_in "Additional weighting", with: 4
    check 'Inadequate laser cat sanctuary'
    check 'Admiral Spaceship'
    choose '2'
    click_on "Save"

    expect(page).to have_content "Needs more laser cats"
    expect(page).to have_link 'Inadequate laser cat sanctuary'
    expect(page).to have_link 'Admiral Spaceship'
    expect(page).to have_content '2'
    expect(page).to have_content '6'
  end
end
