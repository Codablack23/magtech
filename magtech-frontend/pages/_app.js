import Script from 'next/script';
import 'antd/dist/antd.css'
import '../styles/style.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AuthContextProvider from '~/context/auth/context';
import RatesProvider  from '~/context/payments/rateContext';

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
//   Start of HubSpot Embed Code -->
//   <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/26734662.js"></script>
// <!-- End of HubSpot Embed Code 
  //   )
  return (
    <AuthContextProvider>
    <RatesProvider>
    <div className='mg-bg-dark'>
      <Script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/26734662.js"/>
      <Component {...pageProps} />
     </div>
     </RatesProvider>
    </AuthContextProvider>
  
  )
}

export default MyApp
