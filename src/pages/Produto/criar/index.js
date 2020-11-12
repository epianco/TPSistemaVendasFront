import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class CriarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {
                nome: "",
                precoCusto: "",
                precoVenda: "",
                qtdEstoque: ""

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
            return <Redirect to="/produtos" />;
        } else {
            return (
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    
                        
                        <legend><h2>Criar Produto</h2></legend>
                        <div className="usuario-insert">
                            <label htmlFor="nome">Produto </label>
                            <br />
                            <input type="text" id="nome" className="form-group col-md-6" name="nome" placeholder="Nome do Produto" minLength="3" maxLength="100" required 
                                value={this.state.produto.nome} 
                                onChange={this.handleInputChange} 
                            />

                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="endereco">Preço de Custo </label>
                            <br />
                            <input type="text" id="precoCusto" className="form-group col-md-8" name="precoCusto" placeholder="Preço de Custo" required
                                value={this.state.produto.precoCusto}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="email">Preço de Venda</label>
                            <br />
                            <input type="text" name="precoVenda" className="form-group col-md-6" id="precoVenda" placeholder="Preço de Venda" required
                                value={this.state.produto.precoVenda}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="telefone">Estoque</label>
                            <br />
                            <input type="text" name="qtdEstoque" className="form-group col-md-4" maxLength="15" id="qtdEstoque" placeholder="Quantidade Estoque" required
                                value={this.state.produto.qtdEstoque}
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
            produto: {...prevState.produto, [name]: value}
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`, { 
            method:"post",
            body: JSON.stringify(this.state.produto),
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

export default CriarProduto;
