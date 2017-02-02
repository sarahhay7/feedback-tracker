FactoryGirl.define do
  factory :integration do
    source 'external_source'
    credentials(token: 'secret')
  end
end
