import React from 'react';
import {Switch, Route} from 'react-router-dom'
 
import Home from './pages/Home';
import Cadastros from './pages/Tasks';
import CadastrosForm from './pages/Tasks/Form';
import CadastrosDetail from './pages/Tasks/Detail';
 
const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cadastros" exact component={Cadastros} />
            <Route path="/alunos_cadastro" exact component={CadastrosForm} />
            <Route path="/alunos_cadastro/:id" exact component={CadastrosForm} />
            <Route path="/cadastros/:id" exact component={CadastrosDetail} />
        </Switch>
    );
}
 
export default Routes;
