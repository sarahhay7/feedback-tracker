class Integration < ApplicationRecord
  def sync!
    implementation_class(:Sync).perform(self)
  end

  def remote_url_for(customer)
    implementation_class(:RemoteUrl).for(self, customer)
  end

  private

  def implementation_class(*subclasses)
    ["#{source}Integration", *subclasses].join("::").constantize
  end
end
