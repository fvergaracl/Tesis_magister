import datetime

class Config:

    def __init__(self):
        self.api_debug = True
        self.api_port = 8000
        self.api_host = '127.0.0.1'

        self.jwt_secret_key = '#s444444XXXXXX'
        self.api_jwt_time = datetime.timedelta(days=30)

    def get_api_debug(self):
        return self.api_debug

    def get_api_port(self):
        return self.api_port

    def get_api_host(self):
        return self.api_host

    def get_jwt_secret_key(self):
        return self.jwt_secret_key

    def get_api_jwt_time(self):
        return self.api_jwt_time


class Database:

    config = None

    def __init__(self):
        # To connect BD
        self.user = 'root'
        self.password = ''
        self.host = 'localhost'
        self.database_name = 'experimento'

        # DB
        self.config = {'user': self.user,
                       'password': self.password,
                       'host': self.host,
                       'database': self.database_name}