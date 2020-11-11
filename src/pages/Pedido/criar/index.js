import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class CriarPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {
                valor: "",
                quantidade: ""
            },
            produto: [],
            usuario: [],
            erro: null,
            redirect: false
        };
    }

     componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));

        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`)
            .then(order =>
                order.json().then(order => this.setState({ order }))
            )
            .catch(erro => this.setState({ erro }));

            fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario=> this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
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
        const { produto } = this.state;
        const { usuario } = this.state;
        let productList = produto.map((produto, index) =>
            <option key={produto.nome}>{produto.nome}</option>
        );
        let clientList = usuario.map((usuario, index) =>
            <option key={usuario.nome}>{usuario.nome}</option>
        );

        if (redirect) {
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="order-insert">                                   
                                    <select
                                    id="product"
                                    name="product"
                                    required
                                    value={this.state.order.produto}
                                    onChange={this.handleInputChange}
                                    >
                                        {productList}
                                    </select>

                                </div>
                                <div className="order-insert">
                                <select
                                    id="client"
                                    name="client"
                                    required
                                    value={this.state.order.usuario}
                                    onChange={this.handleInputChange}
                                    >
                                        {clientList}
                                    </select>
                                </div>
                                <div className="order-insert">
                                    <label htmlFor="valor">Valor da venda</label>
                                    <br />
                                    <input
                                        type="text"
                                        id="valor"
                                        name="valor"
                                        placeholder="Valor"
                                        min="1"
                                        max="9999"
                                        required
                                        value={this.state.order.valor}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="order-insert">
                                    <label htmlFor="quantidade">Quantidade </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="quantidade"
                                        name="quantidade"
                                        placeholder="Quantidade"
                                        min="1"
                                        max="1000"
                                        required
                                        value={this.state.order.quantidade}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-outline-dark">
                                    Cadastrar
                    </button>
                            </fieldset>
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
            order: {...prevState.order, [name]: value}
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/orders`, { 
            method:"post",
            body: JSON.stringify(this.state.order),
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

export default CriarPedido;








