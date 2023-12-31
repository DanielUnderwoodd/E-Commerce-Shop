import React                                  from 'react';
import ReactDOM                               from 'react-dom';
import App                                    from './App';
import Loading                                from'./components/Loading'
import { Provider }                           from 'react-redux';
import configureStore                         from './config/configureStore'
import {BrowserRouter}                        from  'react-router-dom'
import './index.css';


const { persistor, store } = configureStore()


function Main() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <App/>
       </BrowserRouter>
      </Provider>
  );
}


// ReactDOM.render(
//   <Provider store={store}>

//   </Provider>  
//   ,document.getElementById('root')
// );


persistor.subscribe(() => {
  /* Hydrate React components when persistor has synced with redux store */
  
  const { bootstrapped } = persistor.getState();

  if (bootstrapped) {
     ReactDOM.hydrate(<Main />, document.getElementById("root"));
  }else{
     ReactDOM.hydrate(<Loading />, document.getElementById("root"));
  }
});

