from datetime import datetime
import twitter_api
import requests

def get_tweets(url, max_results="10"):
    twitter_api.params.update({"max_results": max_results})

    twitterResponse = requests.get(url, params=twitter_api.params, headers=twitter_api.headers).json()
    data = twitterResponse["data"]
    includes = twitterResponse["includes"]
    tweets = []

    for tweet in data:
        if "attachments" in tweet.keys():
            image_id = tweet["attachments"]["media_keys"][0]
            image_url = get_image_url(image_id, includes)
        else:
            image_url = None

        for user in includes["users"]:
            if tweet["author_id"] in user.values():
                name = user["name"]
                username = user["username"]
                profile_image_url = user["profile_image_url"]
            else:
                profile_image_url = None

        tweets.append(
            {
                "name": name,
                "username": username,
                "profile_image_url": profile_image_url,
                "id": tweet["id"],
                "text": tweet["text"],
                "image_url": image_url,
                "date": format_date(tweet["created_at"]),
                "like_count": tweet["public_metrics"]["like_count"],
                "retweet_count": tweet["public_metrics"]["retweet_count"],
            }
        )
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
    res = requests.get(twitter_api.user_id_url(username),headers=twitter_api.headers)
    return res.json()["data"][0]["id"]


def sort_by_likes(e):
    return e["like_count"]


def filter_popular(tweetsToSort):
    tweetsToSort.sort(reverse=True, key=sort_by_likes)
    return tweetsToSort[:10]


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
