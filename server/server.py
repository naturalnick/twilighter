from flask import Flask, jsonify, request, render_template
import urllib.parse
import random
from helpers import get_tweets, get_user_id, filter_popular, fav_accounts
import twitter_api


app = Flask(__name__, static_folder="../client/build", static_url_path="")


@app.route("/")
def index():
    return app.send_static_file("index.html"), 200


@app.route("/api/user/search")
def user_tweets():
    query = request.args.get("query")
    user_id = get_user_id(query)

    url = twitter_api.user_tweets_url(user_id)

    response = jsonify(get_tweets(url))
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response, 200


@app.route("/api/tweets/search")
def keyword_tweets():
    query = urllib.parse.quote(request.args.get("query"))
    url = twitter_api.tweets_url(query)

    tweets = filter_popular(get_tweets(url, "100"))
    response = jsonify(tweets)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response, 200


@app.route("/api/tweets/random")
def random_tweet():
    random_id = random.choice(fav_accounts.user_ids)
    url = twitter_api.user_tweets_url(random_id)
    user_tweets = get_tweets(url, "100")

    response = jsonify(random.choice(user_tweets))
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response, 200


@app.errorhandler(KeyError)
def not_found_error(error):
    error_msg = jsonify({"Error": "Not Found"})
    error_msg.headers.add("Access-Control-Allow-Origin", "*")

    return error_msg, 404


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


# remove for pythonanywhere
if __name__ == "__main__":
    app.run(debug=True)
