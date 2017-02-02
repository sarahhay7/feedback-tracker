require 'rails_helper'

module IntercomIntegration
  RSpec.describe Sync do
    around { |example| VCR.use_cassette('intercom', &example) }

    it 'syncs customers' do
      integration = Integration.create!(source: 'intercom', credentials: {
        api_key: 'intercom-api-key',
        app_id: 'intercom-app-id'
      })

      expect { Sync.perform(integration) }.to change { Customer.count }.by(87)

      customer = Customer.first
      expect(customer.name).to eq 'Jim'
      expect(customer.integration).to eq integration
      expect(customer.remote_id).to eq '584a0bfbd150d0e26bd61c06'
    end
  end
end
