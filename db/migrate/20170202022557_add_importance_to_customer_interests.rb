class AddImportanceToCustomerInterests < ActiveRecord::Migration[5.0]
  def change
    add_column :customer_interests, :importance, :integer, limit: 3, null: false
  end
end
