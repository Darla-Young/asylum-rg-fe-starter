// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Style imports
import 'antd/dist/antd.less';
import { Layout } from 'antd';

// Page imports
import { HeaderContent } from './components/Layout/Header';
import {
  LandingPage,
  GraphsContainer,
  NotFoundPage,
} from './components/Layout/Content';
import { FooterContent, SubFooter } from './components/Layout/Footer';
// import { TablePage } from './components/pages/Table';

// State imports
import reducer from './state/reducers';

const store = configureStore({ reducer: reducer });
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

export function App() {
  const { Footer, Header, Content } = Layout;
  return (
    <Layout>
      <Header>
        <HeaderContent />
      </Header>
      <Content>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/graphs" component={GraphsContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </Content>
      <Footer>
        <FooterContent />
      </Footer>
      <Footer>
        <SubFooter />
      </Footer>
    </Layout>
  );
}
