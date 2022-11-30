from dotenv import load_dotenv
import urllib.parse
import requests
import os

load_dotenv()

auth_url = "https://api.twitter.com/oauth2/token"

data = {
    "grant_type": "client_credentials",
}

api_key = os.getenv("__API_KEY__")

api_key_secret = os.getenv("__API_KEY_SECRET__")

res = requests.post(auth_url, data=data, auth=(api_key, api_key_secret))

bearer = res.json()["access_token"]

headers = {"Authorization": f"Bearer {bearer}", "Accept": "application/json"}
params = {
    "expansions": "attachments.media_keys,author_id",
    "media.fields": "url",
    "tweet.fields": "created_at,public_metrics,entities",
    "user.fields": "username,name,profile_image_url",
}

def user_id_url(username):
    return f"https://api.twitter.com/2/users/by?usernames={username}"


def user_tweets_url(user_id):
    return f"https://api.twitter.com/2/users/{user_id}/tweets"


def tweets_url(query):
    filter_query = urllib.parse.quote(" is:verified -is:retweet lang:en")
    return f"https://api.twitter.com/2/tweets/search/recent?query={query}{filter_query}"