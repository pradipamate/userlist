import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import Mystore from './practice/store/store';
import {Provider} from 'react-redux';

const store = Mystore();

const jsx=(
   <Provider store={store}>
       <Routes />
   </Provider>
);
        
console.log(store.getState());
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
