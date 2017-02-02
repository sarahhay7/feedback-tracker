class Integration < ApplicationRecord
  def sync!
    "#{source}Integration::Sync".constantize.perform(self)
  end
end
