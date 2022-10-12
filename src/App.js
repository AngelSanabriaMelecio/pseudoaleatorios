
import './App.css';
import { CuadMedView } from './pages/CuadMedView'
import { ProdMedView } from './pages/ProdMedView'
import { MultConsView } from './pages/MultConsView'
import { ConLinView } from './pages/ConLinView'
import { ConMultView } from './pages/ConMultView'
import { ConAdView } from './pages/ConAdView'
import { CuadView } from './pages/CuadView'
import { BlomBlomView } from './pages/BlomBlomView'
import { AppBar2 } from './components/AppBar2';
import { useState } from 'react'

import {AppProvider} from './context/AppContext'
import PruebaUniformidad from './components/PruebaUniformidad'
import PruebaMedias from './components/PruebaMedias';
import PruebaVarianza from './components/PruebaVarianza';
import PruebaIndependencia from './components/PruebaIndependencia';
import PruebaPoker from './components/PruebaPoker';

function App() {

  const [ selectedMethod,setSelectedMethod ] = useState(0)
  const [ selectedPrueba,setSelectedPrueba ] = useState(0)

  const SelectedMethodView = () => {
    switch (selectedMethod) {
      case 1:
        return <CuadMedView />
      case 2:
        return <ProdMedView />
      case 3:
        return <MultConsView />
      case 4:
        return <ConLinView />
      case 5:
        return <ConMultView />
      case 6:
        return <ConAdView />
      case 7:
        return <CuadView />
      case 8:
        return <BlomBlomView />
      default:
        return <CuadMedView />
    }
  }

  const SelectedPruebaView = () =>{
  
    switch(selectedPrueba){
      case 0:
        return <PruebaMedias/>
      case 1:
        return <PruebaPoker/>
      case 2:
        return <PruebaVarianza/>
      case 3:
        return <PruebaUniformidad/>
      case 4:
        return <PruebaIndependencia/>
      default:
        return <PruebaUniformidad/>
    }
  }

  return (
    <AppProvider>
      <AppBar2 
        setSelectedMethod={setSelectedMethod}
        setSelectedPrueba={setSelectedPrueba}
      />
      <SelectedMethodView />
      <SelectedPruebaView />
    </AppProvider>
  )
}

export default App;
