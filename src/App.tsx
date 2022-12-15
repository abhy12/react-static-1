import { useState, useEffect } from 'react';
import { Outlet, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from "./components/Navigation/Header";
import Loading from './components/Loader/Loading';
import Work from './pages/Work';
import About from './pages/About';
import { motion } from 'framer-motion';
let previousPath: any;

export default function App() {
  	const [isLoading, setIsLoading] = useState( false );
  	const location = useLocation();

  	useEffect( () => {
      if( previousPath && previousPath !== location.pathname )  {
			previousPath = location.pathname;

			addLoading();
		}

		if( !previousPath )  {
			previousPath = location.pathname;
		}

		return () => {
			setIsLoading( false );
		}
   }, [location]);

	function addLoading()  {
		setIsLoading( true );

	  	setTimeout( () => {
			setIsLoading( false );
	  	}, 2460 );
	  ///max animation timing plus trasition timing plus 60ms(i don't know why but it's working after adding 60ms)
  	}

  	return (
	<>
		<Header />
		<main id="main" className="min-h-screen pt-36 md:pt-44">
			<AnimatePresence>
			  	<motion.div
			  		key={location.pathname}
			  		initial={{opacity: 0}}
			  		animate={{opacity: 1}}
			  		exit={{opacity: 0}}
			  		transition={{duration: 2,}}
 				>
				  	<Routes location={location} key={location.pathname}>
						<Route path="/" element={<Work />}/>
						<Route path="/about" element={<About />}/>
				 	</Routes>
				 	<Outlet />
			  	</motion.div>
			</AnimatePresence>
			<Loading active={isLoading}/>
		</main>
	</>
  );
}