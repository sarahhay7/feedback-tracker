# Feedback Tracker

## Development

Set up your environment:

    bin/setup

Run all tests:

    rake

Start a local server:

    bundle exec foreman start

## Integrations

### Intercom

Open a new Rails console (`rails c`) and run:

```ruby
Integration.create!(source: 'Intercom', credentials: {
  app_id: 'your-app-id',
  api_key: 'your-api-key'
})
```

### Pivotal Tracker

Open a new Rails console (`rails c`) and run:

```ruby
Integration.create!(source: 'PivotalTracker', credentials: {
  token: 'your-token',
  project_id: 'your-project-id'
})
```

### Writing a new integration

Your integration must provide two classes: a `Sync` class and a `RemoteUrl` class. These classes must be in the namespace `<NameOfYourIntegration>Integration`.

Example:

```ruby
# app/integrations/foo_integration/sync.rb
module FooIntegration
  class Sync
    def self.perform(integration)
      api_token = integration.credentials['api_token']

      users_response = Net::HTTP.get("https://foo.service/#{api_token}/users")

      JSON.parse(users_response).each do |user|
        customer = Customer.find_or_initialize_by(
          remote_id: user['id'],
          integration: integration
        )

        customer.update!(name: user['name'], email: user['email'])
      end

      tickets_response = Net::HTTP.get("https://foo.service/#{api_token}/tickets")

      JSON.parse(tickets_response).each do |ticket|
        ticket = Ticket.find_or_initialize_by(
          remote_id: ticket['id'],
          integration: integration
        )

        ticket.update!(
          title: story['title'],
          kind: story['type'],
          status: story['status'],
          description: story['description']
        )
      end
    end
  end
end

# app/integrations/foo_integration/remote_url.rb
module FooIntegration
  class RemoteUrl
    def self.for(integration, customer_or_ticket)
      if customer_or_ticket.is_a?(Ticket)
        "https://foo.service/tickets/#{customer_or_ticket.remote_id}"
      else
        "https://foo.service/users/#{customer_or_ticket.remote_id}"
      end
    end
  end
end
```

A new integration can be added by creating a new `Integration` record:

```ruby
Integration.create!(
  source: 'Foo',
  credentials: { api_key: 'abcdef123' }
)
```

`credentials` is an arbitrary hash that supports nesting. All keys are accessed as strings.

## Syncing

To sync your integrations, run:

    rake sync
