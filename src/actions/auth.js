import {api ,request } from './_request';

export const logout = (params) =>
{   
    return (dispatch) =>
    {   
        //Borrar de la base de datos

        api().post('/logout')
        .then(function(response)
        {
            if(response.status === 200)
            {
                //Borrar de la memoria local
                localStorage.removeItem('session_token_maxi_inf');
                dispatch({
                    type: 'DESCONECTADO',
                    payload: 'Desconectado'
                })
            }
        });
    }
}

export const login = (params) =>
{   
    return (dispatch) =>
    {		
        request.post('/oauth/token', 
        {
            username        : params.email,
            password        : params.password,
            client_id       : 2,
            client_secret   : 'yIBcQidGPf5SE3dfTiNAOClh9xzDSwIQc1GEjSho',
            grant_type      : 'password'
        })
        .then(function(response)
        {
            if(response.status === 200)
            {
                localStorage.setItem('session_token_maxi_inf', JSON.stringify(response.data));
                dispatch(
                {
                    type: 'CONECTADO',
                    payload: response.data
                })
            }
        })
        .catch(function(error)
        {
            dispatch(
            {
                type: 'ERROR',
                payload: 'Datos incorrectos.'
            })
        })
    }
}

export const checktoken = () =>
{
    return (dispatch) => {

        let token = localStorage.getItem('session_token_maxi_inf');

        token = JSON.parse(token);

        if(token !== null)
        {
            let AuthorizationToken = token.token_type+" "+token.access_token;

            request.get('api/user',
            {
                responseType: 'json',
                headers: {'Authorization': AuthorizationToken}
            })
            .then(function(response) {
                if(response.status === 200)
                {
                    dispatch(
                    {
                        type: 'CONECTADO',
                        payload: token
                    });
                }
            })
            .catch(function(error) {
                // delete token
                localStorage.removeItem('session_token_maxi_inf');
            });
        }
    }
};

export const whoiam = () =>
{
    return (dispatch) => {

        api().get('/user')
        .then(function(response)
        {
            dispatch(
            {
                type: 'AUTH_WHOIAM_SUCCESS',
                payload: response.data
            });
        });

    }
};