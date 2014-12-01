require 'sinatra'
require 'sinatra/base'
require 'net/http'
require 'uri'
require 'haml'
require 'json'

get '/' do 
    haml :index
end

post '/languages' do 
    username = params["username"]
    look_up_languages(username)
    redirect to '/'
end 

def https_get_request(url)
    url = URI.parse(url)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(url)
    res = http.request(req)
    json = JSON.parse(res.body)
end

def get_languages(user_repos)
    languages_array = Array.new
    user_repos.each do |repo|
        languages_array << https_get_request(repo["languages_url"])
    end
    languages_array
end

def look_up_languages(username)
    user_json = https_get_request("https://api.github.com/users/#{username}")
    user_repos = https_get_request(user_json["repos_url"])
    get_languages(user_repos)
end

