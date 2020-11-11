import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            usuario: [],
            erro: null
        };
    }
    
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`)
            .then(usuario => 
                usuario.json().then(usuario => this.setState({usuario}))
            )
            .catch(erro => this.setState({erro}));
    }
    
    render() {
        const { usuario } = this.state;

        return (
            <div className="usuario-list">
                <Link to={`/criarUsuario`}> <button type="button" class="btn btn-success">Novo</button></Link>
                <br/><br/>

                {/* Exemplo para criar botoes
                
                <button type="button" class="btn btn-primary">Teste</button> */}
            
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th id="acoes" scope="col" class="text-center" colspan="2">Ações</th>
                            <th scope="col"></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuario, index) =>(
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.endereco}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.telefone}</td>
                                <td> <Link to={`/usuarios/${usuario.id}`}><button type="button" class="btn btn-primary">Detalhes</button></Link> </td>
                                <td> 
                                    <Link to={`/editarUsuario/${usuario.id}`}>
                                        <button type="button" class="btn btn-warning">Atualizar</button> 
                                    </Link>
                                </td>
                                <td> 
                                    <Link to={`/deletarUsuario/${usuario.id}`}>
                                        <button type="button" class="btn btn-danger">Excluir</button> 
                                    </Link>                               
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
        
    };
}
