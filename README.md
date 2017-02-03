# Feedback Tracker

## Development

Set up your environment:

    bin/setup

Run all tests:

    rake

Start a local server:

    bundle exec foreman start

## Integrations

## Intercom

Open a new Rails console (`rails c`) and run:

```ruby
Integration.create!(source: 'Intercom', credentials: {
  app_id: 'your-app-id',
  api_key: 'your-api-key'
})
```

## Pivotal Tracker

Open a new Rails console (`rails c`) and run:

```ruby
Integration.create!(source: 'PivotalTracker', credentials: {
  token: 'your-token',
  project_id: 'your-project-id'
})
```

## Syncing

To sync your integrations, run:

    rake sync
