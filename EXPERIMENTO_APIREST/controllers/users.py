import mysql.connector
from settings.configs import Database
from datetime import datetime

def login_user(user_, passw_):
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "SELECT FK_USUARIO_TIPO_tipo_usuario FROM usuario WHERE nickname = %s AND password = %s"
        data = (user_,passw_,)
        cursor.execute(query, data)
        for (FK_USUARIO_TIPO_tipo_usuario) in cursor:
            return FK_USUARIO_TIPO_tipo_usuario[0]
        cursor.close()
        cnx.close()
        return ""
    except Exception as e:
        print('Error #2 en la base de datos')
        print(e)
        return ""

def Get_challenge_state(user_,id_number):
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "SELECT estado FROM r_usuario_challenge WHERE FK_CHALLENGE_id_number = %s AND FK_USUARIO_nickname = %s"
        data = (id_number,user_,)
        print(id_number)
        print(user_)
        cursor.execute(query, data)
        for (estado) in cursor:
            print(estado)
            return estado[0]
        cursor.close()
        cnx.close()
        return ""
    except Exception as e:
        print('Error #2 en la base de datos')
        print(e)
        return ""

def Get_all_challenges(user_):
    r = []
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "SELECT id_number, titulo, objetivos, descripcion FROM challenge WHERE 1;"
        cursor.execute(query,)

        for (id_number, titulo, objetivos, descripcion) in cursor:
            estado = Get_challenge_state(user_,id_number)
            r.append([id_number, titulo, objetivos, descripcion, estado])
        cursor.close()
        cnx.close()
        return r
    except Exception as e:
        print('Error #2 en la base de datos')
        print(e)
        return r 


def Get_pretest():
    r = []
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "SELECT id_test,test_texto,tipo_pregunta FROM pre_pos_test WHERE test_tipopregunta = 'pretest';"
        cursor.execute(query,)
        for (id_test,test_texto,tipo_pregunta) in cursor:

            r.append([{"id":id_test,"text":test_texto,"tipopregunta":tipo_pregunta}])
        cursor.close()
        cnx.close()
        return r
    except Exception as e:
        print('Error #2 en la base de datos')
        print(e)
        return r

def Get_posttest():
    r = []
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "SELECT id_test,test_texto,tipo_pregunta FROM pre_pos_test WHERE test_tipopregunta = 'posttest';"
        cursor.execute(query,)
        for (id_test,test_texto,tipo_pregunta) in cursor:
            r.append([{"id":id_test,"text":test_texto,"tipopregunta":tipo_pregunta}])
        cursor.close()
        cnx.close()
        return r
    except Exception as e:
        print('Error #2 en la base de datos')
        print(e)
        return r



def Get_challenges_by_id(user_,id_desafio):
    r = {}
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "SELECT id_number, titulo, objetivos, descripcion FROM challenge WHERE id_number = %s;"
        data=(id_desafio,)
        cursor.execute(query,data)
        for (id_number, titulo, objetivos, descripcion) in cursor:
            estado = Get_challenge_state(user_, id_desafio)
            return {"titulo":titulo, "objetivo":objetivos,"descripcion":descripcion, "estado":estado}

        return r
    except Exception as e:
        print('Error #2 en la base de datos')
        print(e)
        return r


def get_results(id_desafio_,num1, num2):
    r = []
    try:
        print(id_desafio_)
        print(num1)
        print(num2)
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query ='SELECT id_result,titulo,snippet,url, popularidad FROM((SELECT * FROM query_result WHERE FK_CHALLENGE_id_number = %s ORDER BY id_result DESC LIMIT %s) UNION ALL (SELECT * FROM query_result   WHERE FK_CHALLENGE_id_number = %s  ORDER BY id_result ASC LIMIT %s)) AS AAA'
        data=(id_desafio_,num1,id_desafio_,num2,)
        cursor.execute(query,data)


        for (id_result,titulo,snippet,url,popularidad) in cursor:
            r.append({"id_resultado":id_result,"titulo":titulo,"snippet":snippet,"url":url, "popularidad":popularidad})

        return r
    except Exception as e:
        print('Error #2 en la base de datos<<')
        print(e)
        return r


def insertar_nuevo_registro(tipo_, data_, usuario_):
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        now = datetime.now()
        query = "INSERT INTO logs(log_type, data, server_datetime,FK_USUARIO_nickname) VALUES (%s, %s, %s,%s);"
        data = (tipo_, data_, now, usuario_)
        cursor.execute(query, data)
        cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        print(e)
        return False

def add_reco(id_query):
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "UPDATE query_result SET popularidad = popularidad + 1 WHERE id_result =%s;"
        data = (id_query,)
        cursor.execute(query, data)
        cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        print(e)
        return False


def restar_reco(id_query):
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "UPDATE query_result SET popularidad = popularidad - 1 WHERE id_result =%s;"
        data = (id_query,)
        cursor.execute(query, data)
        cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        print(e)
        return False


def fin_de_desafio_reg(usuario_,n_desafio):
    try:
        database_ = Database()
        config = database_.config
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        query = "INSERT INTO r_usuario_challenge(FK_USUARIO_nickname,FK_CHALLENGE_id_number, estado) VALUES (%s, %s, %s);"
        data = (usuario_,n_desafio,'finalizado')
        cursor.execute(query, data)
        cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        print(e)
        return False