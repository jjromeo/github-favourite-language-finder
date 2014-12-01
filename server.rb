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
    user_json = https_get_request("https://api.github.com/users/#{username}")
    user_repos = https_get_request(user_json["repos_url"])
    @languages_array = []
    user_repos.each do |repo|
        @languages_array << https_get_request(repo["languages_url"])
    end
    @languages = @languages_array.map {|hash| hash.keys.uniq}
    puts @languages
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

def get_languages(url)

end
