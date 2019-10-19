#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request

from flask_cors import CORS


from settings.configs import Config
from routes import *


app = Flask(__name__)
app.register_blueprint(routes)

CORS(app)

c = Config()

if __name__ == '__main__':
    app.run(debug=c.get_api_debug(),
            host=c.get_api_host(),
            port=c.get_api_port()
            )