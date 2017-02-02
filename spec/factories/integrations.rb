FactoryGirl.define do
  factory :integration do
    source 'Intercom'
    credentials(token: 'secret', app_id: 'intecom-test')
  end
end
