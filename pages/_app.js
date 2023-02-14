import '@/styles/globals.scss'
import { Provider } from 'react-redux'
import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Head from 'next/head';
let persistor = persistStore(store);
export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>ISShop</title>
      <meta name="description" content="Online shopping at fingertips" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/Logo_Circular.png" />
    </Head>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>

  </>
}
