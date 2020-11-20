import '../styles/globals.css'
import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper';
import NextNprogress from 'nextjs-progressbar';
import store from '../redux/store';
import 'antd/dist/antd.css';

function MyApp({Component, pageProps}) {
  return (

    <Provider store={store}>
      <Component {...pageProps} />
      <NextNprogress
        color="#29D"
      />
    </Provider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
