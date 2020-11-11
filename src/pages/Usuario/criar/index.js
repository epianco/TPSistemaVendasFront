import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class CriarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                nome: "",
                endereco: "",
                email: "",
                telefone: ""

            },
            erro:null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div class="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    
                        
                        <legend><h2>Criar Usuário</h2></legend>
                        <div className="usuario-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input type="text" id="nome" className="form-group col-md-6" name="nome" placeholder="Nome" minLength="3" maxLength="100" required 
                                value={this.state.usuario.nome} 
                                onChange={this.handleInputChange} 
                            />

                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="endereco">Endereço </label>
                            <br />
                            <input type="text" id="endereco" className="form-group col-md-8" name="endereco" placeholder="Endereço" required
                                value={this.state.usuario.endereco}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="email">Email</label>
                            <br />
                            <input type="email" name="email" className="form-group col-md-6" id="email" placeholder="Email" required
                                value={this.state.usuario.email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="telefone">Telefone</label>
                            <br />
                            <input type="text" name="telefone" className="form-group col-md-4" maxLength="15" id="telefone" placeholder="telefone" required
                                value={this.state.usuario.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>

                       
                        <button type="submit" className="btn btn-primary btn-lg"> Cadastrar</button>
                   
                </form>

                </div>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: {...prevState.usuario, [name]: value}
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`, { 
            method:"post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if(data.ok) {
                    this.setState({redirect:true});
                }else{
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({erro: data.error});
                        }
                    });
                }
            })
            .catch(erro => this.setState({error: erro}));
        event.preventDefault();
    };
}

export default CriarUsuario;
