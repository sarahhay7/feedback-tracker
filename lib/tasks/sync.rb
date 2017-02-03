desc "Sync all integrations"
task :sync => :environment do
  Integration.all.each(&:sync!)
end
