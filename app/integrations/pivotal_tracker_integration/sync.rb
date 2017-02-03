module PivotalTrackerIntegration
  class Sync
    attr_reader :integration

    def initialize(integration)
      @integration = integration
    end

    def perform
      client = TrackerApi::Client.new(token: integration.credentials.fetch('token'))
      client.project(integration.credentials.fetch('project_id')).stories.each do |story|
        sync_story(story)
      end
    end

    def self.perform(*args)
      self.new(*args).perform
    end

    private

    def sync_story(story)
      ticket = Ticket.find_or_initialize_by(
        remote_id: story.id,
        integration: integration
      )

      ticket.update!(
        title: story.name,
        kind: story.story_type,
        status: story.current_state
      )
    end
  end
end
