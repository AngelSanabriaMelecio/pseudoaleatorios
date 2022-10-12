import { useRef, useState, useEffect } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from "../context/AppContext"

export const MultConsView = () => {


    const seedRef = useRef()
    const seed1Ref = useRef()
        
    const {generated, setGenerated} = useAppContext()

    function handleSubmit(e) {
        e.preventDefault()
        if (seedRef.current.value.length !== seed1Ref.current.value.length) return

        var X = Number(seedRef.current.value)
        var a = Number(seed1Ref.current.value)

        if (X < 1000 || a < 1000) return

        let gen = []

        while (true) {
            let D = (X + "").length
            let Y0 = X * a
            let N = (Y0 + "").length
            let p1 = Math.trunc((N - D) / 2)

            let string = Y0.toString()

            let ri = Number(string.substring(p1, N - p1 - ((N - D) % 2 ? 1 : 0)))
            if (gen.includes(ri)) break

            gen.push(ri)
            X = ri
        }
        setGenerated( formatGen(gen) )
    }
    

    function formatGen( gen ){
        let newArr = gen.map( (g) =>
            Number("0."+g)
        )
        return newArr
    }

    return (
        <Container>
            <h2>Multiplicador Constante</h2>
            <Form>
                <div className="form-row">
                    <Form.Group>
                        <Form.Label>Semilla X: </Form.Label>
                        <Form.Control
                            type="number"
                            ref={seedRef}
                            placeholder="Un numero con mas de 3 digitos"
                            required
                        >
                        </Form.Control>
                        <Form.Label>Constante a: </Form.Label>
                        <Form.Control
                            type="number"
                            ref={seed1Ref}
                            placeholder="Otro numero con la misma cantidad de digitos"
                            required
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <Button style={{ marginTop: 10 }} onClick={handleSubmit} type="submit">Generar</Button>
                <div className="generatedNumbers">
                    {generated.map((g, i) =>
                        <div className="generated" key={i}>
                            <div className="pseudo">
                                { g }
                            </div>
                        </div>
                    )}
                </div>
            </Form>
        </Container>
    )
}