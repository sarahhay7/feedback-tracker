class AddEmailAndToIntegrationToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :email, :string
    add_column :customers, :remote_id, :string, index: true
    add_reference :customers, :integration, foreign_key: true
  end
end
