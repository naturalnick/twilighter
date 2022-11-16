from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import requests
from datetime import datetime
import urllib.parse
import random

app = Flask(__name__)
load_dotenv()

data = {
    "grant_type": "client_credentials",
}
api_key = os.environ["__API_KEY__"]
api_key_secret = os.environ["__API_KEY_SECRET__"]
res = requests.post("https://api.twitter.com/oauth2/token", data=data, auth=(api_key, api_key_secret))
bearer = res.json()["access_token"]
headers = {
        "Authorization" : f"Bearer {bearer}",
        "Accept": "application/json"
    }
params = {
        "expansions": "attachments.media_keys,author_id",
        "media.fields": "url",
        "tweet.fields": "created_at,public_metrics,entities",
        "user.fields": "username,name,profile_image_url",
    }
    
def get_tweets(url, max_results="10"):
    params.update({"max_results": max_results})

    twitterResponse = requests.get(url, params=params, headers=headers).json()
    data = twitterResponse["data"]
    includes = twitterResponse["includes"]
    tweets = []

    for tweet in data:
        if "attachments" in tweet.keys():
            image_id = tweet["attachments"]["media_keys"][0]
            image_url = get_image_url(image_id, includes)
        else: image_url = None

        for user in includes["users"]:
            if tweet["author_id"] in user.values():
                name = user["name"]
                username = user["username"]
                profile_image_url = user["profile_image_url"]
            else: profile_image_url = None

        tweets.append({
            "name": name,
            "username": username,
            "profile_image_url": profile_image_url,
            "id": tweet["id"],
            "text": tweet["text"],
            "image_url": image_url,
            "date": format_date(tweet["created_at"]),
            "like_count": tweet["public_metrics"]["like_count"],
            "retweet_count": tweet["public_metrics"]["retweet_count"],
        })
    return tweets

def format_date(date):
    twitter_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
    formatted_date = twitter_date.strftime("%b %d, %Y")
    return formatted_date

def get_image_url(image_id, media_data):
    for media in media_data["media"]:
        if media["media_key"] == image_id and media["type"] == "photo":
            return media["url"]
    return None

def get_user_id(username):
    return requests.get(f"https://api.twitter.com/2/users/by?usernames={username}",
        headers=headers).json()["data"][0]["id"]

@app.route("/api/user/search")
def user_tweets():
    query = request.args.get("query")
    user_id = get_user_id(query)

    user_tweets_url = f"https://api.twitter.com/2/users/{user_id}/tweets"

    response = jsonify(get_tweets(user_tweets_url))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 200

def sort_by_likes(e):
    return e["like_count"]

def filter_popular(tweetsToSort):
    tweetsToSort.sort(reverse=True, key=sort_by_likes)
    return tweetsToSort[:10]

@app.route("/api/tweets/search")
def keyword_tweets():
    query = urllib.parse.quote(request.args.get("query"))
    filter_query = urllib.parse.quote(' is:verified -is:retweet lang:en')
    search_tweets_url = f"https://api.twitter.com/2/tweets/search/recent?query={query}{filter_query}"
    
    tweets = filter_popular(get_tweets(search_tweets_url, "100"))
    response = jsonify(tweets)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response, 200

class FavoriteAccounts:
    def __init__(self, usernames):
        self.usernames = usernames
        self.user_ids = self.get_ids()
    def get_ids(self):
        user_ids = []
        for username in self.usernames:
            user_ids.append(get_user_id(username))
        return user_ids

fav_accounts = FavoriteAccounts(["EckhartTolle", "TEDTalks", "Atlasobscura", "thewordoftheday", "ScienceChannel"])

@app.route("/api/tweets/random")
def random_tweet():
    random_id = random.choice(fav_accounts.user_ids)
    user_tweets_url = f"https://api.twitter.com/2/users/{random_id}/tweets"
    user_tweets = get_tweets(user_tweets_url, "100")

    response = jsonify(random.choice(user_tweets))
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response, 200

@app.errorhandler(KeyError)
def not_found_error(error):
    error_msg = jsonify({"Error": "Not Found"})
    error_msg.headers.add("Access-Control-Allow-Origin", "*")
    return error_msg, 404

app.run(debug=True)