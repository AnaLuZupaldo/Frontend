import React, { useState } from "react";
import api from "../../config/configApi.js"
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css'


export const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({

        email: '',
        password: ''

    })
    const [status, setStatus] = useState({

        type: '',
        mensagem: ''
    })


    const responseGoogleFailure = (response) => {
        console.log(response);
        // Trate a falha de login, se necessário
    }



    const [loading, setLoading] = useState(false);
    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value })

    const loginSubmit = async e => {

        e.preventDefault()
        //console.log(user.email);
        //console.log(user.password);

        //converte em json
        setLoading(true)
        const headers = {

            'Content-Type': 'application/json'
        }


        try {
            await api.post('/users-login', user, { headers })
                .then((response) => {
                    setStatus({
                        type: 'success',
                        mensagem: response.data.mensagem,

                    });
                    navigate("/dashboard");
                });
        } catch (error) {
            if (error.response) {
                setStatus({
                    type: 'error',
                    mensagem: error.response.data.mensagem,

                });
            } else {
                setStatus({
                    type: 'error',
                    mensagem: "Servidor está em manutenção, tente novamente mais tarde"
                });
            }
        } finally {
            setLoading(false); // Desativa o indicador de carregamento
        }

    }
    const handleGoogleLoginSuccess = (response) => {
        const { tokenId } = response;
        // Use the token ID to authenticate the user
        api.post("/users-google-login", { tokenId })
            .then((response) => {
                setStatus({ type: "success", mensagem: response.data.mensagem });
                navigate("/dashboard");
            })
            .catch((error) => {
                setStatus({ type: "error", mensagem: error.response.data.mensagem });
            });
    };


    return (
        <div className="login-body">
            <body>

                <section>

                    <div className="login-content">

                        <form onSubmit={loginSubmit} className="content">

                            <div className="login-header">
                                <img src="logo-alpha.png" width={80} />
                                <h1>Login</h1>
                            </div>
                            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
                            {status.type === 'error' ? <p>{status.mensagem}</p> : ""}

                            <div className="mb-3">
                                <label className="alLabel">Email </label>
                                <input type="email" name="email" placeholder="Digite seu email" onChange={valueInput} />
                            </div>
                            <div class="mb-3">
                                <label className="alLabel">Senha</label>
                                <input type="password" name="password" placeholder="Digite a sua senha" onChange={valueInput} />
                            </div>

                            <div className="more-information">
                                <a className="link-info link-dark" href="/listar">Esqueci minha senha </a>
                                <a className="link-info link-dark" href="/listar">Cadastre-se</a>
                            </div>
                            <div className="nav-icons">
                                <div className="icon-item">
                                    <GoogleLogin
                                        clientId="559622831083-6dumj4843nhfklvmggddjm0tkenedfcs.apps.googleusercontent.com"
                                        onSuccess={handleGoogleLoginSuccess}
                                        onFailure={(response) => console.error(response)}
                                        cookiePolicy={"single_host_origin"}
                                        render={(renderProps) => (
                                            <i className="bx bxl-google" onClick={renderProps.onClick}></i>
                                        )}
                                    />
                                </div>
                                <div className="icon-item i2">
                                    <i class='bx bxl-github'></i>
                                </div>
                                <div className="icon-item i2">
                                    <i class='bx bxs-envelope' ></i>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-dark" disabled={loading}>
                                {loading ? 'Carregando...' : 'Entrar'}
                            </button>

                        </form>
                        <div className="final-login">
                            <img className="login-img" src="login.gif" width={400} />

                        </div>
                        <div className="blackbox"> </div>
                    </div>
                </section>
            </body>
        </div>
    )

}
export default Login