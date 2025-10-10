class WebsitesController < ApplicationController
  def index
    @websites = Website.all
  end

  def gradient_maker

  end
end
