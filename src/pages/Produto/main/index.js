import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            produto: [],
            erro: null
        };
    }
    
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/produtos`)
            .then(produto => 
                produto.json().then(produto => this.setState({produto}))
            )
            .catch(erro => this.setState({erro}));
    }
    
    render() {
        const { produto } = this.state;

        return (
            <div className="usuario-list">
                <Link to={`/criarProduto`}> <button type="button" class="btn btn-success">Novo</button></Link>
                <br/><br/>

                {/* Exemplo para criar botoes
                
                <button type="button" class="btn btn-primary">Teste</button> */}
            
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço de Custo</th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Estoque</th>
                            <th id="acoes" scope="col" class="text-center" colspan="2">Ações</th>
                            <th scope="col"></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto, index) =>(
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.precoCusto}</td>
                                <td>{produto.precoVenda}</td>
                                <td>{produto.qtdEstoque}</td>
                                <td> <Link to={`/produtos/${produto.id}`}><button type="button" class="btn btn-primary">Detalhes</button></Link> </td>
                                <td> 
                                    <Link to={`/editarProduto/${produto.id}`}>
                                        <button type="button" class="btn btn-warning">Atualizar</button> 
                                    </Link>
                                </td>
                                <td> 
                                    <Link to={`/deletarProduto/${produto.id}`}>
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
