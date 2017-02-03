module PivotalTrackerIntegration
  class Sync
    attr_reader :integration

    def initialize(integration)
      @integration = integration
    end

    def perform
      stories.each { |story| sync_story(story) }
    end

    def self.perform(*args)
      self.new(*args).perform
    end

    private

    def stories
      TrackerApi::Client.new(token: token).project(project_id).stories
    end

    def token
      integration.credentials.fetch('token')
    end

    def project_id
      integration.credentials.fetch('project_id')
    end

    def sync_story(story)
      ticket = Ticket.find_or_initialize_by(
        remote_id: story.id,
        integration: integration
      )

      ticket.update!(
        title: story.name,
        kind: story.story_type,
        status: story.current_state,
        description: story.description
      )
    end
  end
end
