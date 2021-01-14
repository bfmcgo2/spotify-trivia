// import '../styles/globals.css';
import { GeistProvider, CssBaseline } from "@geist-ui/react";

import { UserProvider } from '../context/UserContext';
import GlobalStyles from '../components/shared/GlobalStyles';





const App = ({ Component, pageProps }) => {
  return (
	  	<GeistProvider>
	  		<GlobalStyles>
	  			<UserProvider>
		  	 	<CssBaseline />
			 	<Component {...pageProps} />
	  		</UserProvider>
	  		</GlobalStyles>
	  		
		</GeistProvider>
  	)
}

export default App
