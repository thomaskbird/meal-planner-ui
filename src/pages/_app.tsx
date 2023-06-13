import '../styles/app.css';

import React from 'react'
import { AppProps } from 'next/app'

import { Provider } from 'react-redux';
import { appStore } from '~/redux/app-reducers'
import HydrateZustand from "~/components/HydrateZustand";

const COMPONENT_NAME = 'App';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <HydrateZustand>
    <Provider store={appStore}>
      <div className={`${COMPONENT_NAME}`}>
        <div className="page-content container">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  </HydrateZustand>
)

export default App
