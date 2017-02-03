class AddImportanceMutationToFeedbacks < ActiveRecord::Migration[5.0]
  def change
    add_column :feedbacks, :importance_mutation, :integer, null: false, default: 0
  end
end
