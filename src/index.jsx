import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Auth0ProviderWithHistory as Auth0Provider } from './auth-provider-with-history';

// Style imports
import 'antd/dist/antd.less';
import './styles/Pages/RenderProfilePage.less';
import './styles/Pages/RenderLandingPage.less';
import './styles/Pages/RenderHeader.less';
import './styles/Pages/RenderFooter.less';

// Page imports
import { App } from './App';

// State imports
import reducer from './state/reducers';

const store = configureStore({ reducer: reducer });

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <Auth0Provider>
          <App />
        </Auth0Provider>
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);
