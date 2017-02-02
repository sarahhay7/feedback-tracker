module IntercomIntegration
  class RemoteUrl
    attr_reader :integration, :customer

    def initialize(integration, customer)
      @integration = integration
      @customer = customer
    end

    def to_s
      "https://app.intercom.io/a/apps/#{app_id}/users/#{customer_id}"
    end

    def self.for(*args)
      self.new(*args).to_s
    end

    private

    def customer_id
      customer.remote_id
    end

    def app_id
      integration.credentials.fetch('app_id')
    end
  end
end
