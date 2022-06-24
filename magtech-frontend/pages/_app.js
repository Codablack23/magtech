import Head from 'next/head';
import 'antd/dist/antd.css'
import '../styles/style.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyApp({ Component, pageProps }) {
  //  new TradingView.widget(
  //       {
  //       "symbol": "NASDAQ:AAPL",
  //       "timezone": "Etc/UTC",
  //       "theme": "dark",
  //       "style": "1",
  //       "locale": "en",
  //       "toolbar_bg": "#f1f3f6",
  //       "enable_publishing": false,
  //       "withdateranges": true,
  //       "range": "YTD",
  //       "hide_side_toolbar": false,
  //       "allow_symbol_change": true,
  //       "details": true,
  //       "container_id": "tradingview_796e4"
  //     }
  //   )
  return (
     <div className='mg-bg-dark'>
      <Head>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </Head>
      <Component {...pageProps} />
     </div>
  )
}

export default MyApp
