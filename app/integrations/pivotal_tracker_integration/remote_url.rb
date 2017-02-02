module PivotalTrackerIntegration
  class RemoteUrl
    def self.for(integration, ticket)
      "https://www.pivotaltracker.com/story/show/#{ticket.remote_id}"
    end
  end
end
