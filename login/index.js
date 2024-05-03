import React, { useState } from "react";
import api from "../../config/configApi.js"
import { useNavigate } from 'react-router-dom'
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
                        mensagem: response.data.mensagem
                    });
                    navigate("/dashboard");
                });
        } catch (error) {
            if (error.response) {
                setStatus({
                    type: 'error',
                    mensagem: error.response.data.mensagem
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

    return (
        <div className="login-body">
            <body>
                <nav className="navbar bg-body-tertiary">
                    <div className="container">
                        <a class="navbar-brand" href="#">
                            <h1>Alpha</h1>
                        </a>
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><i class='bx bxs-user-circle'></i></a>
                            </li>

                        </ul>
                    </div>
                </nav>
                <section className="login-content">
                    <div className="content">
                        <form onSubmit={loginSubmit}>

                            <h1>Login</h1>
                            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
                            {status.type === 'error' ? <p>{status.mensagem}</p> : ""}

                            <div className="form-group">
                            <label for="exampleInputPassword1" class="form-label">Email</label>
                                <input type="email" name="email" placeholder="Digite seu email" onChange={valueInput} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" class="form-label">Senha</label>
                                <input type="password" name="password" placeholder="Digite a sua senha" onChange={valueInput} />
                            </div>

                            <div className="more-information">
                                <a className="nav-link" href="/listar">Esqueci minha senha </a>
                                <a className="nav-link" href="/listar">Cadastre-se</a>
                            </div>
                            <div className="navbar-nav nav-icons">
                                <ul className="nav">
                                    <li className="nav-item">
                                    <i class='bx bxl-google' ></i>
                                    </li>
                                    <li className="nav-item">
                                    <i class='bx bxl-github'></i>

                                    </li>
                                    <li className="nav-item">
                                    <i class='bx bxs-envelope' ></i>

                                    </li>

                                </ul>
                            </div>
                            <button type="submit" className="btn btn-dark" disabled={loading}>
                                {loading ? 'Carregando...' : 'ENTRAR'}
                            </button>

                        </form>
                    </div>
                    <div className="final-login">
                        <img src="login.gif" width={20} />

                    </div>
                    <div className="blackbox">

                    </div>
                </section>
            </body>
        </div>
    )

}
export default Login