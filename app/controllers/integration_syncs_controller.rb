class IntegrationSyncsController < ApplicationController
  def create
    integration = Integration.find(params[:id])
    integration.sync!
    flash[:notice] = "Successfully synced #{integration.source}"
    redirect_back fallback_location: root_path
  end
end
