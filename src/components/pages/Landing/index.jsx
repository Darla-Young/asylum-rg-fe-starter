// Use this to handle state to props for landing page components

import React from 'react';
import RenderLandingPage from './LandingPage.jsx';

function LandingContainer({ LoadingComponent }) {
  return (
    <>
      <RenderLandingPage />
    </>
  );
}

export default LandingContainer;
