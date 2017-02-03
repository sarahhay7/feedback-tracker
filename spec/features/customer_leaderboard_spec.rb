require 'rails_helper'

RSpec.feature "Customer leaderboard" do
  scenario "As a user, I can see a list of customers by amount of feedback" do
    amy = create(:customer, name: 'Amy')
    bill = create(:customer, name: 'Bill')
    carol = create(:customer, name: 'Carol')

    3.times { create(:customer_interest, customer: amy) }
    5.times { create(:customer_interest, customer: bill) }
    2.times { create(:customer_interest, customer: carol) }

    visit customers_path
    expect(page).to have_content('#1 Bill 5 points')
    expect(page).to have_content('#2 Amy 3 points')
    expect(page).to have_content('#3 Carol 2 points')
  end
end
