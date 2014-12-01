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
    @user = params["username"]
    @favourite_language = guess(@user)
    puts @favourite_language.inspect
    haml :results
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
        languages_array << repo["language"] unless repo["language"] == nil
    end
    languages_array
end

def look_up_languages(username)
    user_json = https_get_request("https://api.github.com/users/#{username}")
    user_repos = https_get_request(user_json["repos_url"])
    get_languages(user_repos)
end

def guess_favourite(languages_array)
    languages_array.max_by {|language| languages_array.count(language)}
end

def guess(username)
    languages_array = look_up_languages(username)
    puts languages_array.inspect
    guess_favourite(languages_array)
end

