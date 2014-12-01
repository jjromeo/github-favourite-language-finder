require 'sinatra'
require 'net/http'
require 'uri'
require 'haml'
require 'json'

get '/' do 
    haml :index
end

post '/languages' do 
    username = params["username"]
    url = URI.parse("https://api.github.com/users/#{username}")
    user_json = https_get_request(url)
    repos_url = URI.parse(user_json["repos_url"])
    user_repos = https_get_request(repos_url)
    redirect to '/'
end 

def https_get_request(url)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(url)
    res = http.request(req)
    json = JSON.parse(res.body)
end
