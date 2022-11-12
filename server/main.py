from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import requests

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
        "tweet.fields": "created_at,public_metrics",
        "user.fields": "username,name,profile_image_url",
    }

def get_tweets(url):
    tweets = []
    res1 = requests.get(url, params=params, headers=headers).json()
    data = res1["data"]
    includes = res1["includes"]
    for item in data:
        name = ""
        username = ""
        profile_image_url = ""
        image_url = ""

        if "attachments" in item.keys():
            image_id = item["attachments"]["media_keys"][0]
            image_url = get_image_url(image_id, includes)

        for user in includes["users"]:
            if item["author_id"] in user.values():
                name = user["name"]
                username = user["username"]
                profile_image_url = user["profile_image_url"]

        tweets.append({
            "name": name,
            "username": username,
            "profile_image_url": profile_image_url,
            "id": item["id"],
            "text": item["text"],
            "image": image_url,
            "date": item["created_at"],
            "like_count": item["public_metrics"]["like_count"],
            "retweet_count": item["public_metrics"]["retweet_count"],
        })
    return res1

def get_image_url(image_id, media_data):
    for media in media_data["media"]:
        if media["media_key"] == image_id and media["type"] == "photo":
            return media["url"]
        else: return None


@app.route("/api/user/search")
def user_tweets():
    query = request.args.get("query")

    res1 = requests.get(f"https://api.twitter.com/2/users/by?usernames={query}",
    headers=headers).json()["data"][0]
    user_id = res1["id"]

    user_tweets_url = f"https://api.twitter.com/2/users/{user_id}/tweets"

    return get_tweets(user_tweets_url), 200

@app.route("/api/tweets/search")
def keyword_tweets():
    query = request.args.get("query")
    search_tweets_url = f"https://api.twitter.com/2/tweets/search/recent?query={query}"
    return get_tweets(search_tweets_url), 200

@app.route("/api/tweets/random")
def random_tweet():
    favorite_twitter_accounts = ["EckhartTolle"]
    return "Random Tweet"

app.run(debug=True)