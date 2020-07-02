#!/usr/bin/env python

from flask import Flask, render_template

app = Flask(__name__)

# app.register_blueprint(image_api)


# catch all to redirect all paths to be handled on client-side by react router
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def load_app(path):
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
