class AddDescriptionToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :description, :text
  end
end
