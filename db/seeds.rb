%w( Unstarted Started Completed Stalled Notified ).each do |name|
  FeedbackState.create!(name: name)
end
