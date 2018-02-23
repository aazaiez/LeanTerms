import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {CurrentUser} from './utils/session_api';
import {ReceiveCurrentUser,LoginUser} from './actions/session_actions';


document.addEventListener("DOMContentLoaded",()=>{    
     
     CurrentUser().then((user) => {
         console.log(user);
         if (Object.keys(user).length > 0){
             window.current_user = user;
         }         
            let preloadstate =undefined;
            if (window.current_user){
                preloadstate={
                    session:{
                        CurrentUser: window.current_user
                    }
                };
            }

            let store = configureStore(preloadstate);
            window.store = store;
            window.LoginUser = LoginUser;
            window.ReceiveCurrentUser= ReceiveCurrentUser;
            window.getState = store.getState;
            window.dispatch = store.dispatch;

            ReactDOM.render(<Root store={store}/>,document.getElementById('root'));
     });
});



