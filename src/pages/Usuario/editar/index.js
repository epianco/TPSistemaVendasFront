import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class EditarUsuario extends Component {
    constructor(props){
        super(props);

        this.state = {
            usuario: {
                nome: "",
                endereco: "",
                email: "",
                telefone: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de Conexão com o servidor
                </div>
            );
        }
    }

    componentDidMount () {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios/${id}`)
            .then(data => {
                data.json().then(data => {
                    if(data.error) {
                        this.setState({ erro: data.error });
                    }else {
                        this.setState({ usuario: data});
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }       

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    
                        
                        <legend><h2>Alteração de Cliente</h2></legend>
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
                            <input type="text" name="telefone" className="form-group col-md-4" id="telefone"   maxLength="15" placeholder="telefone" required
                                value={this.state.usuario.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <Link to={`/usuarios`}><button className="btn btn-outline-secondary">Voltar</button>  </Link> 
                        <button type="submit" className="btn btn-primary "> Atualizar</button>
                   
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
            usuario: { ...prevState.usuario, [name]: value}
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.usuario;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error});
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
        
        event.preventDefault();
    };
}

export default EditarUsuario;