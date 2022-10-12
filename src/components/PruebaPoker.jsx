import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from '../context/AppContext'

export default function PruebaPoker() {

    const nRef = useRef()
    const mRef = useRef()
    const aceptRef = useRef()
    const alfaRef = useRef()
    const promRef = useRef()

    const limIRef = useRef()
    const limSRef = useRef()

    const [accepted, setAccepted] = useState(false)
    const [aceptacion, setAceptacion] = useState(95)    

    const [observated, setObservated] = useState([])
    const [esperada, setEsperada] = useState([])
    const [chi, setChi] = useState([])
    const [tableChi, setTableChi] = useState()

    const [chiString, setChiString] = useState('')

    const { generated, setPoker, decimales, setDecimales, pruebas } = useAppContext()

    useEffect(()=>{
        console.log('llega')
        return () => { console.log('se Fue'); setPoker(false)}
    },[])

    useEffect(() => {

        let N = generated.length

        let newOb = []
        let newEs = []
        let newChi = []

        pruebas[decimales].value.map((clase, i) => {
            newOb.push(calculateOb(clase.category))
            newEs.push(N * clase.probability)
            newChi.push(calculateChi(newEs[i], newOb[i]))
        })

        setObservated(newOb)
        setEsperada(newEs)
        setChi(newChi)

        setTableChi(getChi())

    }, [generated, decimales, aceptacion])

    function dif(s) {
        let n = s.length
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++)
                if (s[i] === s[j]) return false
        }
        return true
    }

    function contarIguales(s, iguales) {
        let n = s.length
        let cub = []
        for (let i = '0'; i <= '9'; i++)
            cub[i] = 0

        for (let i = 0; i < n; i++)
            cub[s[i]]++;

        let cont = 0
        for (let i = '0'; i < '9'; i++)
            if (cub[i] === iguales) cont++
        return cont
    }

    function calculateOb(cat) {
        let cont = 0
        let d = pruebas[decimales].decimals
        cont = generated.reduce((acum, g) => {
            let gs = g + ''
            let from = gs.indexOf('.') + 1

            let s = gs.substring(from, from + d)

            if (cat === 'TD') return acum + dif(s)
            if (cat === '1P') return acum + (contarIguales(s, 2) === 1)
            if (cat === '2P') return acum + (contarIguales(s, 2) === 2)
            if (cat === 'TP')
                return acum + (contarIguales(s, 2) === 1 && contarIguales(s, 3) === 1)
            if (cat === 'T') return acum + (contarIguales(s, 3) === 1)
            if (cat === 'P') return acum + (contarIguales(s, 4) === 1)
            if (cat === 'Q') return acum + (contarIguales(s, 5) === 1)

            return 0
        }, 0)
        return cont
    }
    
    function calculateChi(E, O) {
        return Math.pow(E - O, 2) / E
    }

    function getSum(arr) {
        return arr.reduce((acum, e) => {
            return acum + e
        }, 0)
    }

    function getChi() {
        let alfa = (100 - aceptacion) / 100
        let m = pruebas[decimales].value.length - 1

        //console.log( '---->', alfa,'',m )

        if (alfa === 0.05) {
            if (m === 2) {
                return 5.991
            }
            else if (m === 4) {
                return 9.488
            }
            else if (m === 6) {
                return 12.592
            }
        }
        else if (alfa === 0.02) {
            if (m === 2) {
                return 7.378
            }
            else if (m === 4) {
                return 11.143
            }
            else if (m === 6) {
                return 14.449
            }
        }
        else if (alfa === 0.01) {
            if (m === 2) {
                return 9.210
            }
            else if (m === 4) {
                return 13.277
            }
            else if (m === 6) {
                return 16.812
            }
        }
    }

    const ChiString = () => {
        return(
            <>
                X<sup>2</sup><sub>{(100 - aceptacion) / 100},{pruebas[decimales].value.length - 1}</sub>
            </>
        )
    }

    return (
        <Container>
            <h2>Prueba de Poker</h2>
            <div className="form-row">
                <Form.Group>
                    Nivel de Aceptacion
                    <div className="form-row" >
                        <button
                            className='acept'
                            style=
                            {{
                                backgroundColor: aceptacion === 95 ? "#0d6efd" : '#f2f2f2',
                                color: aceptacion === 95 ? "#ffffff" : '#000000'
                            }}
                            onClick={() => setAceptacion(95)}>
                            95 %
                        </button>
                        <button
                            className='acept'
                            style=
                            {{
                                backgroundColor: aceptacion === 98 ? "#0d6efd" : '#f2f2f2',
                                color: aceptacion === 98 ? "#ffffff" : '#000000'
                            }}
                            onClick={() => setAceptacion(98)}>
                            98 %
                        </button>
                        <button
                            className='acept'
                            style=
                            {{
                                backgroundColor: aceptacion === 99 ? "#0d6efd" : '#f2f2f2',
                                color: aceptacion === 99 ? "#ffffff" : '#000000'
                            }}
                            onClick={() => setAceptacion(99)}>
                            99 %
                        </button>
                    </div>
                    Decimales:
                    <div className="form-row" >
                        <button
                            className='acept'
                            style=
                            {{
                                backgroundColor: decimales === 0 ? "#0d6efd" : '#f2f2f2',
                                color: decimales === 0 ? "#ffffff" : '#000000'
                            }}
                            onClick={() => setDecimales(0)}>
                            3
                        </button>
                        <button
                            className='acept'
                            style=
                            {{
                                backgroundColor: decimales === 1 ? "#0d6efd" : '#f2f2f2',
                                color: decimales === 1 ? "#ffffff" : '#000000'
                            }}
                            onClick={() => setDecimales(1)}>
                            4
                        </button>
                        <button
                            className='acept'
                            style=
                            {{
                                backgroundColor: decimales === 2 ? "#0d6efd" : '#f2f2f2',
                                color: decimales === 2 ? "#ffffff" : '#000000'
                            }}
                            onClick={() => setDecimales(2)}>
                            5
                        </button>
                    </div>
                    <div className="form-row" >
                        <div>
                            <Form.Label>n</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={nRef}
                                value={generated.length}
                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                    </div>

                    <table className='mt-3' >
                        <tbody>
                            <tr>
                                <th>Categoria</th>
                                <th>Frec. Observada</th>
                                <th>Probabilidad</th>
                                <th>Frec. Esperada</th>
                                <th>X<sup>2</sup><sub>i</sub></th>
                            </tr>
                            {pruebas[decimales].value.map((c, i) =>
                                <tr key={i}>
                                    <td>
                                        {c.category}
                                    </td>
                                    <td>
                                        {observated[i]}
                                    </td>
                                    <td>
                                        {c.probability}
                                    </td>
                                    <td>
                                        {esperada[i]?.toFixed(3)}
                                    </td>
                                    <td>
                                        {chi[i]?.toFixed(3)}
                                    </td>
                                </tr>)}
                            <tr>
                                <th>
                                </th>
                                <th>
                                    {getSum(observated)}
                                </th>
                                <th>

                                </th>
                                <th>
                                    {Math.round(getSum(esperada))}
                                </th>
                                <th>
                                    {getSum(chi)?.toFixed(3)}
                                </th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th> <ChiString/> = </th>
                                <td>{tableChi}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-3">
                        { getSum(chi) < tableChi ? 
                        <>
                            Como la X<sup>2</sup><sub>O</sub> es menor al estadistico <ChiString/> <br /> 
                            entonces los {generated.length} r<sub>i</sub> son INDEPENDIENTES
                        </> :
                        <>
                            Como la X<sup>2</sup><sub>O</sub> es mayor al estadistico <ChiString/> <br /> 
                            entonces los {generated.length} r<sub>i</sub> no son INDEPENDIENTES
                        </>}
                    </div>
                
                </Form.Group>
            </div>
            <Button className="mt-3" >
                Probar
            </Button>
        </Container>
    )
}