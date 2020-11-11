import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pedido: [],
            erro: null
        };
    }
    
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`)
            .then(pedido => 
                pedido.json().then(pedido => this.setState({pedido}))
            )
            .catch(erro => this.setState({erro}));
    }
    
    render() {
        const { pedido } = this.state;

        return (
            <div className="usuario-list">
                <Link to={`/criarPedido`}> <button type="button" class="btn btn-success">Novo</button></Link>
                <br/><br/>

                {/* Exemplo para criar botoes
                
                <button type="button" class="btn btn-primary">Teste</button> */}
            
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Pedido</th>
                            <th scope="col">Nome Cliente</th>
                            <th scope="col">Nome Produto </th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Estoque</th>
                            <th id="acoes" scope="col" class="text-center" colspan="2">Ações</th>
                            <th scope="col"></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.map((pedido, index) =>(
                            <tr>
                                <th scope="row">{pedido.id}</th>
                                <td>{pedido.id_usuario}</td>
                                <td>{pedido.id_produto}</td>
                                <td>{pedido.valorUnitario}</td>
                                <td>{pedido.qtd}</td>
                                <td> <Link to={`/produtos/${pedido.id}`}><button type="button" class="btn btn-primary">Detalhes</button></Link> </td>
                                <td> 
                                    <Link to={`/editarProduto/${pedido.id}`}>
                                        <button type="button" class="btn btn-warning">Atualizar</button> 
                                    </Link>
                                </td>
                                <td> 
                                    <Link to={`/deletarProduto/${pedido.id}`}>
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
