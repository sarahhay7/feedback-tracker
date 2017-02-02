Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'feedbacks#new'
  resources :feedbacks, only: [:new, :create]
  resources :feedback_states, only: :show

  post 'integrations/:id/sync' => 'integration_syncs#create', as: :integration_sync
end
