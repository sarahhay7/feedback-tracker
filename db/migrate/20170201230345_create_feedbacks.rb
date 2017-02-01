class CreateFeedbacks < ActiveRecord::Migration[5.0]
  def change
    create_table :feedbacks do |t|
      t.string :description, null: false
      t.timestamps
      t.references :feedback_state, null: false, foreign_key: true
    end
  end
end
