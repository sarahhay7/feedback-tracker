require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock

  config.ignore_request do |request|
    # Allow communication with the Selenium driver, for example.
    ['127.0.0.1', 'localhost'].include?(URI(request.uri).host)
  end
end
