Rails.application.routes.draw do
  resources :feedbacks, only: [:new, :create]
  resources :feedback_states, only: :show

  post 'integrations/:id/sync' => 'integration_syncs#create', as: :integration_sync

  resources :feedbacks, only: [:new, :create]
  resources :feedback_states, only: :show

  namespace :api do
    jsonapi_resources :feedbacks
  end

  root to: 'application#index'
  match '*path', to: 'application#index', via: :all
end
