import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Produto extends Component {
    state = {
        produto: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({produto}))
            )
        .catch(erro => this.setState({ erro }));
            }

render(){
    const { produto, index } = this.state;

    // if (produto.ativo){
    //     produto.ativo = "Produto Ativo";
    // } else {
    //     produto.ativo = "Produto Inativo";
    // }

    return (
        <div className="container">
        <label className="text-justify"><h2 >INFORMAÇÕES</h2> </label>
        <div className="usuario-info " >
                
                <h2> Produto: {produto.nome} </h2>
                <h2> Preço de Custo: {produto.precoCusto} </h2>
                <h2> Preço de Venda: {produto.precoVenda} </h2>
                <h2> Estoque: {produto.qtdEstoque} </h2>
                <br />
                <Link to={`/produtos`}><button className="btn btn-primary">Voltar</button>  </Link> 
                <Link to={`/editarProduto/${produto.id}`}><button className="btn btn-warning">Editar</button>   </Link> 
                <Link to={`/deletarProduto/${produto.id}`}><button className="btn btn-danger">Deletar </button>  </Link> 
            </div>
            </div>
        
        );
    }
}


