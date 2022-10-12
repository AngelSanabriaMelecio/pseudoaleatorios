import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from '../context/AppContext'

export default function PruebaUniformidad() {

    const alfaRef = useRef()
    const aceptRef = useRef(0)

    const nRef = useRef()
    const mRef = useRef()
    const promRef = useRef()

    const { generated, getValorOb } = useAppContext()

    const [intervals, setIntervals] = useState([])
    const [valorOb, setValorOb] = useState([])
    const [valorEs, setValorEs] = useState([])
    const [valFormula, setValFormula] = useState([])

    function getObSum() {
        return valorOb.reduce((count, item) => {
            return count + item
        }, 0)
    }

    function getForSum() {
        return valFormula.reduce((count, item) => {
            return count + Number(item)
        }, 0).toFixed(3)
    }

    function handleProbar() {
        let n = generated.length
        let m = Math.round(Math.sqrt(n))
        if (m * m < n) m++

        if( !n ) return

        let inter = []
        let valOb = []
        let valEs = []
        let formula = []

        let acum = 0
        inter.push(0)
        while (acum < 1) {
            let last = inter[inter.length - 1]
            acum = (1 / m) * inter.length
            inter.push(acum)

            let val = generated.reduce((count, item) => {
                return count + getValorOb(last, acum, item)
            }, 0)

            let esp = Math.round(n / m)

            valOb.push(val)
            valEs.push(esp)

            let f = Math.pow(esp - val, 2) / esp

            formula.push(f)
        }
        

        setIntervals(inter)
        setValorOb(valOb)
        setValorEs(valEs)
        setValFormula(formula)
        
        nRef.current.value = n
        mRef.current.value = m
    }

    function handleAChange(event) {
        let num = event.target.value
        if (num > 100) {
            aceptRef.current.value = 100
            alfaRef.current.value = 0
            return
        }
        aceptRef.current.value = num
        alfaRef.current.value = 100 - num
    }


    return (
        <Container>
            <h2>Prueba de Uniformidad</h2>
            <div className="form-row">
                <Form.Group>
                    <div className="form-row" >
                        <div>
                            <Form.Label>Aceptacion:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="En porcentaje"
                                ref={aceptRef}
                                onChange={(e) => handleAChange(e)}
                                required
                            >
                            </Form.Control>
                        </div>
                        <div>
                            <Form.Label>Alfa:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={alfaRef}
                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                    </div>
                    <div className="form-row" >
                        <div>
                            <Form.Label>n</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={nRef}

                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                        <div>
                            <Form.Label>m</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={mRef}
                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                    </div>
                    
                </Form.Group>
            </div>
            <Button className="mt-3" onClick={()=>handleProbar()}>
                Probar
            </Button>
            <table className='mt-3'>
                <tbody>
                    <tr>
                        <th>
                            <p>Limite Inferior</p>
                        </th>
                        <th>
                            <p>Limite Superior</p>
                        </th>
                        <th>
                            <p>Valor Observado</p>
                        </th>
                        <th>
                            <p>Valor Esperado</p>
                        </th>
                        <th>
                            <p>(Ei-Oi)^2 / Ei</p>
                        </th>
                    </tr>
                    {
                        valorOb.map((item, i) =>
                            <tr key={i}>
                                <td>
                                    {intervals[i].toFixed(3)}
                                </td>
                                <td>
                                    {intervals[i + 1].toFixed(3)}
                                </td>
                                <td>
                                    {item}
                                </td>
                                <td>
                                    {valorEs[i]}
                                </td>
                                <td>
                                    {Number(valFormula[i]).toFixed(3)}
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table >

            <table className='mt-3'>
                <tbody>

                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            {getObSum()}
                        </td>
                        <td>

                        </td>
                        <td>
                            {getForSum()}
                        </td>
                    </tr>
                </tbody>
            </table>

        </Container>
    )
}
