import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Usuario extends Component {
    state = {
        usuario: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({usuario}))
            )
        .catch(erro => this.setState({ erro }));
            }

render(){
    const { usuario, index } = this.state;

    if (usuario.ativo){
        usuario.ativo = "Usuário Ativo";
    } else {
        usuario.ativo = "Usuário Inativo";
    }

    return (
        <div className="container">
        <label className="text-justify"><h2 >INFORMAÇÕES</h2> </label>
        <div className="usuario-info " >
                
                <h2> Cliente: {usuario.nome} </h2>
                <h2> Endereço: {usuario.endereco} </h2>
                <h2> Email: {usuario.email} </h2>
                <h2> Telefone: {usuario.telefone} </h2>
                <br />
                <Link to={`/usuarios`}><button className="btn btn-primary">Voltar</button>  </Link> 
                <Link to={`/editarUsuario/${usuario.id}`}><button className="btn btn-warning">Editar</button>   </Link> 
                <Link to={`/deletarUsuario/${usuario.id}`}><button className="btn btn-danger">Deletar </button>  </Link> 
            </div>
            </div>
        
        );
    }
}


