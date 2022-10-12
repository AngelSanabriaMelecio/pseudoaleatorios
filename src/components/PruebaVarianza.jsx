import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from '../context/AppContext'

export default function PruebaVarianza(){
    

    
    const nRef = useRef()
    const mRef = useRef()
    const aceptRef = useRef()
    const alfaRef = useRef()
    const promRef = useRef()

    const varRef = useRef()

    const limIRef = useRef()
    const limSRef = useRef()

    const { generated, getValorOb } = useAppContext()

    const [accepted, setAccepted] = useState(false)

    useEffect(()=>{
        

    },[])

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
    function handleProbar(){
        let n = generated.length
        let alfa = alfaRef.current.value
        

        if( !alfa ) return

        let sum = generated.reduce((acum, item)=>{
            return acum + Number(item)
        },0)
        
        let P = (sum/n)
        let sumV = generated.reduce((acum,item )=>{
            return acum + Math.pow(item - P,2)
        },0)

        let v  = sumV/(n-1)

        varRef.current.value = v.toFixed(3)
        nRef.current.value = n
        promRef.current.value = P.toFixed(3)
    }

    return(
        <Container>
            <h2>Prueba de Varianza</h2>
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
                    </div>
                    <div className="form-row" >
                        <div>
                            <Form.Label>Promedio</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={promRef}

                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                        <div>
                            <Form.Label>Varianza</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={varRef}

                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                    </div>
                    <div className="form-row" >
                        <div>
                            <Form.Label>Limite Inferior</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={limIRef}

                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                        <div>
                            <Form.Label>Limite Superior</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                ref={limSRef}
                                required
                                disabled
                            >
                            </Form.Control>
                        </div>
                    </div>
                    <div className="form-row" >
                        <div>
                            { accepted ? <>
                                Hipotesis Aceptada
                            </>: <>
                                Hipotesis Rechazada
                            </> }
                        </div>
                    </div>
                </Form.Group>
            </div>
            <Button className="mt-3" onClick={()=>handleProbar()}>
                Probar
            </Button>
        </Container>
    )
}