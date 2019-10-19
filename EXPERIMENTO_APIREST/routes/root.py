import jwt, datetime
from . import routes
from flask import Flask, jsonify, request

from flask_cors import CORS

from functions.token_functions import token_required, get_info_token
from settings.configs import Config
from controllers.users import login_user, Get_all_challenges,Get_pretest, Get_challenges_by_id, get_results,Get_posttest, insertar_nuevo_registro, fin_de_desafio_reg, add_reco,restar_reco
c = Config()



@routes.route('/', methods=['GET'])
def index():
    """
    Test REST API
    :return: Json with test message
    """
    return jsonify({'message': "Todo OK", 'code': 200})



@routes.route('/login', methods=['POST'])
def login():
    message = ''
    code = 500
    token = ''
    try:

        user_ = str(request.get_json()['usuario'].encode('utf-8').strip().decode("utf-8"))
        pass_ = str(request.get_json()['contrasena'].encode('utf-8').strip().decode("utf-8"))
        if user_ == '' or user_.strip() == '':
            message = 'Debes ingresar un usuario válido'
            code = 400
            raise Exception
        if pass_ == '' or pass_.strip() == '':
            message = 'Debes ingresar un usuario válido'
            code = 400
            raise Exception
        tipousuario = str(login_user(user_,pass_))
        if not (tipousuario == ""):
            print('*>>>>>1')
            print(tipousuario)
            message ='Logeado correctamente'
            code = 200
            token = jwt.encode({"nickname":user_,"tipousuario":tipousuario, 'exp': datetime.datetime.utcnow() + c.get_api_jwt_time()}, c.get_jwt_secret_key())
            #registrar esto
            return jsonify({'message': message, 'token':token.decode("utf-8"), 'code': code})
        else:
            print('*>>>>>2')
            print(tipousuario)
            message = 'Ususario o contraseña incorrecto'
            code = 400
            return jsonify({'message': message, 'code': code})
    except Exception as e:
        print('/login |' +str(e))
        return jsonify({'message': message, 'code': code})


@routes.route('/GetAllChallenges', methods=['GET'])
@token_required
def GetAllChallenges():
    data = get_info_token()
    ALLCHALLENGES = Get_all_challenges(data['nickname'])
    return jsonify({'message': "OK",'allchallenges':ALLCHALLENGES , 'code': 200})


@routes.route('/getdesafio/<ur>', methods=['GET'])
@token_required
def getinfobyiddesafio(iddesafio):
    data = get_info_token()

@routes.route('/getdesafio/<iddesafio>', methods=['GET'])
@token_required
def getinfobyiddesafio(iddesafio):
    data = get_info_token()
    print(data)
    pretest_data_temp = Get_pretest()
    pretest_data = []
    posttest_data_temp = Get_posttest()
    posttest_data = []
    detalle_desafio = Get_challenges_by_id(data['nickname'],iddesafio)
    resultados= []
    if (data['tipousuario'] == 'GRUPO A'):
        print('G-A')
        resultados = get_results(iddesafio, 0, 50)
    elif (data['tipousuario'] == 'GRUPO B'):
        print('G-B')
        resultados = get_results(iddesafio, 10, 40)
    elif (data['tipousuario'] == 'GRUPO C'):
        print('G-C')
        resultados = get_results(iddesafio, 20, 30)
    elif (data['tipousuario'] == 'GRUPO D'):
        print('G-D')
        resultados = get_results(iddesafio, 30, 20)
    for x in pretest_data_temp:
        pretest_data.append(x[0])
    for x in posttest_data_temp:
        posttest_data.append(x[0])
    return jsonify({'message': "OK",'pretest':pretest_data,'posttest':posttest_data,'detalle':detalle_desafio, 'test':resultados, 'code': 200})


@routes.route('/recomendar', methods=['POST'])
@token_required
def recomendar__():
    message = ''
    code = 500
    try:
        id_query = str(request.get_json()['idquery'])
        accion = str(request.get_json()['accion'].encode('utf-8').strip().decode("utf-8"))
        code = 200
        message = 'ok'
        print(id_query)
        print(accion)
        if (accion == 'sumar'):
            add_reco(id_query)
        elif (accion == 'restar'):
            restar_reco(id_query)
        return jsonify({'message': message, 'code': code})
    except Exception as e:
        print('/registrar_accion |' +str(e))
        return jsonify({'message': message, 'code': code})

@routes.route('/registrar_accion', methods=['POST'])
@token_required
def registrar_accion_():
    message = ''
    code = 500
    token = ''
    try:

        tipo_ = str(request.get_json()['tipo'].encode('utf-8').strip().decode("utf-8"))
        dato_ = str(request.get_json()['dato'].encode('utf-8').strip().decode("utf-8"))
        usuario_ = str(request.get_json()['usuario'].encode('utf-8').strip().decode("utf-8"))
        code = 200
        message = 'ok'
        print(tipo_)
        print(dato_)
        print(usuario_)
        respuesta = insertar_nuevo_registro(tipo_,dato_,usuario_)
        return jsonify({'message': respuesta, 'code': code})
    except Exception as e:
        print('/registrar_accion |' +str(e))
        return jsonify({'message': message, 'code': code})

@routes.route('/fin_desafio', methods=['POST'])
@token_required
def fin_desafio_():
    message = ''
    code = 500
    token = ''
    try:

        ndesafio = str(request.get_json()['ndesafio'].encode('utf-8').strip().decode("utf-8"))
        usuario_ = str(request.get_json()['usuario'].encode('utf-8').strip().decode("utf-8"))
        code = 200
        message = 'ok'
        respuesta = fin_de_desafio_reg(usuario_,ndesafio)
        return jsonify({'message': respuesta, 'code': code})
    except Exception as e:
        print('/fin_desafio |' +str(e))
        return jsonify({'message': message, 'code': code})

@routes.route('/islogged', methods=['GET'])
@token_required
def testing_logged():
    """
    Returns the data contained in the token, and thus validates that the token is valid
    """
    data = get_info_token()
    return jsonify({'message': "You're logged",'data':data , 'code': 200})