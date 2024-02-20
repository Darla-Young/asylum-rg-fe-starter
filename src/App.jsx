import { useEffect } from 'react';
import { setVisualizationData } from './state/actionCreators';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderContent } from './components/Layout/Header';
import {
  LandingPage,
  GraphsContainer,
  NotFoundPage,
  ProfilePage,
} from './components/Layout/Content';
import { FooterContent, SubFooter } from './components/Layout/Footer';

export function App() {
  const { Footer, Header, Content } = Layout;

  function updateState(years, view, office, stateSettingCallback) {
    const url = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    if (!years) years = [2015, new Date().getFullYear()];
    if (!view) view = 'time-series';
    if (!office) office = 'All Offices';
    if (!stateSettingCallback) stateSettingCallback = setVisualizationData;

    axios
      .get(`${url}/fiscalSummary`, { params: { from: years[0], to: years[1] } })
      .then(result => {
        console.log('fiscal summary', result);
        setVisualizationData(view, office, result.data, years);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    updateState();
  }, []);

  return (
    <Layout>
      <Header>
        <HeaderContent />
      </Header>
      <Content>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route
            path="/graphs"
            updateState={updateState}
            component={GraphsContainer}
          />
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
