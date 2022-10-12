import { useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from "../context/AppContext"

export const CuadMedView = () => {
    const seedRef = useRef()

    const {generated,setGenerated} = useAppContext()

    function format( gen ){
        let newGen = []
        gen.map( (g) => { newGen.push(Number('0.'+g)) })
        return newGen
    }

    function handleSubmit(e) {
        e.preventDefault()
        var X = Number(seedRef.current.value)
        if( X < 1000 ) return
        
        let gen = []
        
        while( true )
        {
            let D = (X+"").length
            let Y0 = X*X
            let N = (Y0+"").length
            let p1 = Math.trunc((N-D)/2)
            
            let string = Y0.toString()
            
            let ri = Number(string.substring( p1,N-p1-((N-D)%2 ? 1 : 0) ))
            if( gen.includes(ri) )break
            
            gen.push(ri)
            X = ri
        }
        setGenerated( format(gen) )
    }
   
    return (
        <Container>
            <h2>Cuadrados Medios</h2>
            <Form>
                <div className="form-row">
                    <Form.Group>
                        <Form.Label>Semilla: </Form.Label>
                        <Form.Control
                            type="number"
                            ref={seedRef}
                            placeholder="Un numero con mas de 3 digitos"
                            required
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <Button style={{marginTop:10}} onClick={handleSubmit} type="submit">Generar</Button>
                <div className="generatedNumbers">
                    { generated.map( (g,i) =>

                        <div className="generated" key={g}>
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