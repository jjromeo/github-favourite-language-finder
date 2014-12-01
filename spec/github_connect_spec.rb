require 'spec_helper'

describe 'github_connect' do 
    it 'can connect to a given github profile api' do 
        VCR.use_cassette('user') do
            user_json = https_get_request('https://api.github.com/users/jjromeo')
            expect(user_json["login"]).to eq "jjromeo"
        end
    end

    it 'can get to json of users repo from user\'s github profile' do
        VCR.use_cassette('repos') do 
            user_json = https_get_request('https://api.github.com/users/jjromeo')
            repos_json = https_get_request(user_json["repos_url"])
            expect(repos_json.class).to eq Array
            expect(repos_json.count).to eq 30
            expect(repos_json[0]["name"]).to eq "advanced-student-directory"
        end
    end

    it 'can create an array of hashes of the languages a user uses' do 
        VCR.use_cassette('languages') do 
            languages_array = look_up_languages("jjromeo")
            expect(languages_array.class).to eq Array
            expect(languages_array.include?("Ruby")).to eq true
        end
    end

    it 'can guess the favourite language of a user' do 
        VCR.use_cassette('guess') do 
            expect(guess("jjromeo")).to eq("Ruby")
        end
    end

end
