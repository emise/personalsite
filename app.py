#!/usr/bin/env python

from flask import Flask, render_template

app = Flask(__name__)

# app.register_blueprint(image_api)


@app.route('/')
def load_app():
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
