import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext';

export function AppBar2({setSelectedMethod, setSelectedPrueba} ) {

    const {methodModalVisible, setMethodModalVisible,
        PruebaModalVisible, setPruebaModalVisible} = useAppContext()

    function selectMethod() {
        setMethodModalVisible(true)
    }
    
    function selectPrueba(){
        setPruebaModalVisible(true)
    }

    function methodSelected(id) {
        setMethodModalVisible(false)
        setSelectedMethod(id)
    }

    function pruebaSelected(id){
        setPruebaModalVisible(false)
        setSelectedPrueba(id)
    }

    return (
        <Container style={{ width: '50%', height: '700px' }}>
            <div className="sideBar">
                {methodModalVisible &&
                    <div className="methodModal">
                        <button className='selection' onClick={() => methodSelected(4)}>
                            Lineal
                        </button>
                        <button className='selection' onClick={() => methodSelected(5)}>
                            Multiplicativo
                        </button>
                        <button className='selection' onClick={() => methodSelected(6)}>
                            Aditivo
                        </button>
                        <button className='selection' onClick={() => methodSelected(7)}>
                            Cuadratico
                        </button>
                        <button className='selection' onClick={() => methodSelected(8)}>
                            Bloom Bloom
                        </button>
                    </div>
                }
                {PruebaModalVisible &&
                    <div className="methodModal">
                        <button className='selection' onClick={() => pruebaSelected(0)}>
                            Medias
                        </button>
                        <button className='selection' onClick={() => pruebaSelected(1)}>
                            Poker
                        </button>
                    </div>
                }
                <button
                    className="selection"
                    onClick={() => selectMethod()}>
                    <h5>
                        Selecciona un Metodo
                    </h5>
                </button>
                <button 
                    className="selection"
                    onClick={ ()=> selectPrueba() } >
                    <h5>
                        Selecciona una prueba
                    </h5>
                </button>
            </div>
        </Container>
    )
}