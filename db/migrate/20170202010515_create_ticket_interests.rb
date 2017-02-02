class CreateTicketInterests < ActiveRecord::Migration[5.0]
  def change
    create_table :ticket_interests do |t|
      t.references :feedback, foreign_key: true, null: false
      t.references :ticket, foreign_key: true, null: false
      t.timestamps
    end
  end
end
