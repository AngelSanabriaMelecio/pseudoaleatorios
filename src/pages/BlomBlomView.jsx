import { useRef, useState, useEffect } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from "../context/AppContext"

export function BlomBlomView() {

    const xRef = useRef()
    const gRef = useRef()
    const mRef = useRef()

    const {generated, setGenerated} = useAppContext()

    function handleSubmit(e) {
        e.preventDefault()
        
        var X = Number(xRef.current.value)
        var m = Number(mRef.current.value)

        if (X <= 0 || m <= 0 ) return


        let gen = []
        while (true) {
            let Y = (X * X) % m
    
            if (gen.includes(Y)) break
            gen.push(Y)
            X = Y
        }
        setGenerated( format(gen))
    }

    function format( gen ){
        let m = mRef.current.value
        let newGen = []
        gen.map( item =>  newGen.push((item/(m-1)).toFixed(5)) )
        return newGen
    }

    function handleGChange(event) {

        let num = event.target.value
        mRef.current.value = num ? Math.pow(2, num) : ''
    }

    return (
        <Container>
            <h2>Blom Blom</h2>
            <Form className="form">

                <div className="form-row">
                    <Form.Group>

                        <div className="form-row">
                            <div>
                                <Form.Label>Semilla:</Form.Label>
                                <Form.Control
                                    type="number"
                                    ref={xRef}
                                    placeholder="Un entero"
                                    required
                                >
                                </Form.Control>
                            </div>
                        </div>
                        <div className="form-row" >
                            <div>
                                <Form.Label>g:</Form.Label>
                                <Form.Control
                                    type="number"
                                    ref={gRef}
                                    placeholder="Un entero menor a 25"
                                    onChange={(e) => handleGChange(e)}
                                    required
                                >
                                </Form.Control>
                            </div>
                            <div>
                                <Form.Label>m:</Form.Label>
                                <Form.Control
                                    type="number"
                                    ref={mRef}
                                    placeholder="Se calcula: 2^g"
                                    disabled={true}
                                    required
                                >
                                </Form.Control>
                            </div>
                        </div>
                        
                    </Form.Group>
                </div>
                <Button style={{ marginTop: 10 }} onClick={handleSubmit} type="submit">Generar</Button>
                <div className="generatedNumbers">
                    {generated.map((g, i) =>
                        <div className="generated" key={i}>
                            <div className="pseudo">
                                {g}
                            </div>
                        </div>
                    )}
                </div>
            </Form>
        </Container>
    )
}