import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainUsuario from './pages/Usuario/main';
import DetalhesUsuario from './pages/Usuario/detalhes';
import CriarUsuario from './pages/Usuario/criar';
import EditarUsuario from './pages/Usuario/editar';
import DeletarUsuario from './pages/Usuario/deletar'

import MainProduto from './pages/Produto/main';
import DetalhesProduto from './pages/Produto/detalhes';
import CriarProduto from './pages/Produto/criar';
import EditarProduto from './pages/Produto/editar';
import DeletarProduto from './pages/Produto/deletar'


import MainPedido from './pages/Pedido/main';
import CriarPedido from './pages/Pedido/criar';


const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/usuarios" component={MainUsuario} />
            <Route path="/usuarios/:id" component={DetalhesUsuario} />
            <Route path="/criarUsuario" component={CriarUsuario} />
            <Route path="/editarUsuario/:id" component={EditarUsuario} />
            <Route path="/deletarUsuario/:id" component={DeletarUsuario} />

            <Route exact path="/produtos" component={MainProduto} />
            <Route path="/produtos/:id" component={DetalhesProduto} />
            <Route path="/criarProduto" component={CriarProduto} />
            <Route path="/editarProduto/:id" component={EditarProduto} />
            <Route path="/deletarProduto/:id" component={DeletarProduto} />

            <Route exact path="/pedidos" component={MainPedido} />
            <Route exact path="/criarPedido" component={CriarPedido} />
             
            <Route exact path="/" component={MainPedido} />           


        </Switch>
    </BrowserRouter>
    
)

export default Routes;