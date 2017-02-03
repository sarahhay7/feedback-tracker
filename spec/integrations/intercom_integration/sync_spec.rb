require 'rails_helper'

module IntercomIntegration
  RSpec.describe Sync do
    around { |example| VCR.use_cassette('intercom', &example) }

    let(:integration) do
      Integration.create!(source: 'intercom', credentials: {
        api_key: 'intercom-api-key',
        app_id: 'intercom-app-id'
      })
    end

    it 'syncs customers' do
      expect { Sync.perform(integration) }.to change { Customer.count }.by(87)

      customer = Customer.first
      expect(customer.name).to eq 'Jim'
      expect(customer.integration).to eq integration
      expect(customer.remote_id).to eq '584a0bfbd150d0e26bd61c06'
      expect(customer.email).to eq 'person3@example.com'
    end

    it 'updates existing customers rather than creating new ones' do
      customer = create(:customer, {
        remote_id: '584a0bfbd150d0e26bd61c06',
        integration: integration,
        name: 'Original',
        email: 'original@example.com'
      })

      expect { Sync.perform(integration) }.to change { Customer.count }.by(86)

      customer.reload

      expect(customer.name).to eq 'Jim'
      expect(customer.email).to eq 'person3@example.com'
    end
  end
end
