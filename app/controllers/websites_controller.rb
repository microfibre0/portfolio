class WebsitesController < ApplicationController
  def index

  end

  def gradient_maker

  end

  def leaving_site
    @url = params[:url]
  end
end
