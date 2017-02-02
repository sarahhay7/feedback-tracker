require 'rails_helper'

module PivotalTrackerIntegration
  RSpec.describe Sync do
    around { |example| VCR.use_cassette('pivotal-tracker', &example) }

    it 'syncs customers' do
      integration = Integration.create!(source: 'PivotalTracker', credentials: {
        token: 'pivotal-tracker-token',
        project_id: 1234567
      })

      expect { Sync.perform(integration) }.to change { Ticket.count }.by(8)

      ticket = Ticket.first
      expect(ticket.title).to eq 'Completed Feature'
      expect(ticket.integration).to eq integration
      expect(ticket.remote_id).to eq '138964449'
      expect(ticket.kind).to eq 'feature'
      expect(ticket.status).to eq 'accepted'
    end
  end
end
