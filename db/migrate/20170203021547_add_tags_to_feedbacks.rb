class AddTagsToFeedbacks < ActiveRecord::Migration[5.0]
  def change
    add_column :feedbacks, :tags, :text, array: true, index: true, null: false, default: []
  end
end
