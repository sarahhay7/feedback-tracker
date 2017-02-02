Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :feedbacks, only: [:new, :create]
  resources :feedback_states, only: :show
end
