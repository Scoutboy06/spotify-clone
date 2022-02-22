import { Provider } from 'react-redux';
import store from '@/app/store';
import '../styles/globals.css';
import WebPlayback from '@/components/WebPlayback';

function MyApp({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <Component {...pageProps} />
      <WebPlayback />
    </Provider></>
}

export default MyApp;
