class CreateCustomerInterests < ActiveRecord::Migration[5.0]
  def change
    create_table :customer_interests do |t|
      t.references :feedback, foreign_key: true, null: false
      t.references :customer, foreign_key: true, null: false
      t.timestamps
    end
  end
end
