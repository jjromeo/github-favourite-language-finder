require 'spec_helper'

describe 'github_connect' do 
    it 'can connect to a given github profile api' do 
        VCR.use_cassette('user') do
            user_json = https_get_request('https://api.github.com/users/jjromeo')
            expect(user_json["login"]).to eq "jjromeo"
        end
    end
end
