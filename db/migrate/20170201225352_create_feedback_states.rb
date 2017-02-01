class CreateFeedbackStates < ActiveRecord::Migration[5.0]
  def change
    create_table :feedback_states do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
