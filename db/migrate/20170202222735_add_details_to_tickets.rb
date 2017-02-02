class AddDetailsToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :kind, :string
    add_column :tickets, :status, :string
    add_column :tickets, :remote_id, :string
    add_reference :tickets, :integration, foreign_key: true
  end
end
