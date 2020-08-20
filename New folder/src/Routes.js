import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Form from './practice/Form';


export default class Routes extends React.Component{
    render(){
        return(
             <BrowserRouter>
               <div>
                <Route path="/" component={Form} exact={true} />
                <Route path="/form" component={Form}  />
               </div>
            </BrowserRouter>
        )
    }
}