module IntercomIntegration
  class Sync
    attr_reader :integration

    def initialize(integration)
      @integration = integration
    end

    def perform
      Intercom::Client.new(credentials).users.all.each do |user|
        sync_user user
      end
    end

    def self.perform(*args)
      self.new(*args).perform
    end

    private

    def credentials
      integration.credentials.symbolize_keys
    end

    def sync_user(user)
      return if user.name.nil?

      customer = Customer.find_or_initialize_by(
        remote_id: user.id,
        integration: integration
      )

      customer.update!(name: user.name, email: user.email)
    end
  end
end
