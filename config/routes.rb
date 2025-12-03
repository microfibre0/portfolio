Rails.application.routes.draw do
  root to: 'websites#index'
  get 'gradient_maker', to: 'websites#gradient_maker'
  get 'leaving_site', to: 'websites#leaving_site'
  get 'about_me', to: 'websites#about_me'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
