#!/usr/bin/env python

from flask import Flask, render_template
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from routes.email_api import email_api
from routes.photos_api import photos_api

application = app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address)

limiter.limit('1/second')(email_api)

app.register_blueprint(email_api)
app.register_blueprint(photos_api)


# catch all to redirect all paths to be handled on client-side by react router
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def load_app(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=False)
