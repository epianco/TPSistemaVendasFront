import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class EditarProduto extends Component {
    constructor(props){
        super(props);

        this.state = {
            produto: {
                nome: "",
                precoCusto: "",
                precoVenda: "",
                qtdEstoque: ""
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

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(data => {
                data.json().then(data => {
                    if(data.error) {
                        this.setState({ erro: data.error });
                    }else {
                        this.setState({ produto: data});
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }       

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    
                        
                        <legend><h2>Alteração de Produto</h2></legend>
                        <div className="produto-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input type="text" id="nome" className="form-group col-md-6" name="nome" placeholder="Nome" minLength="3" maxLength="100" required 
                                value={this.state.produto.nome} 
                                onChange={this.handleInputChange} 
                            />

                        </div>
                        <div className="produto-insert">
                            <label htmlFor="precoCusto">Preço de Custo </label>
                            <br />
                            <input type="text" id="precoCusto" className="form-group col-md-8" name="precoCusto" placeholder="Preço de Custo" required
                                value={this.state.produto.precoCusto}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-insert">
                            <label htmlFor="precoVenda">Preço de Venda</label>
                            <br />
                            <input type="text" name="precoVenda" className="form-group col-md-6" id="precoVenda" placeholder="Preço de Venda" required
                                value={this.state.produto.precoVenda}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-insert">
                            <label htmlFor="qtdEstoque">Estoque</label>
                            <br />
                            <input type="text" name="qtdEstoque" className="form-group col-md-4" id="qtdEstoque"   maxLength="15" placeholder="Qtd Estoque" required
                                value={this.state.produto.qtdEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <Link to={`/produtos`}><button className="btn btn-outline-secondary">Voltar</button>  </Link> 
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
            produto: { ...prevState.produto, [name]: value}
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.produto;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
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

export default EditarProduto;