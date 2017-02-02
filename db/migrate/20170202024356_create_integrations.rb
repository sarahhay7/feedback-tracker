class CreateIntegrations < ActiveRecord::Migration[5.0]
  def change
    create_table :integrations do |t|
      t.string :source, null: false
      t.jsonb :credentials, default: '{}'
      t.timestamps
    end
  end
end
