import { useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from "../context/AppContext"

export const ProdMedView = () =>{
    const seedRef = useRef()
    const seed1Ref = useRef()

    const {generated,setGenerated} = useAppContext()

    function format( gen ){
        let newGen = []
        gen.map( (g) => { newGen.push(Number('0.'+g)) })
        return newGen
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(seedRef.current.value.length !== seed1Ref.current.value.length )return

        var X0 = Number(seedRef.current.value)
        var X1 = Number(seed1Ref.current.value)
        
        if( X0 < 1000 || X1 < 1000 ) return
        
        let gen = []
        
        while( true )
        {
            let D = (X0+"").length
            let Y0 = X0*X1
            let N = (Y0+"").length
            let p1 = Math.trunc((N-D)/2)
            
            let string = Y0.toString()
            
            let ri = Number(string.substring( p1,N-p1-((N-D)%2 ? 1 : 0) ))
            if( gen.includes(ri) )break
            
            gen.push(ri)
            X0 = X1
            X1 = ri
        }
        setGenerated( format(gen) )
    }

    return (
        <Container>
            <h2>Productos Medios</h2>
            <Form>
                <div className="form-row">
                    <Form.Group>
                        <Form.Label>Semilla X0: </Form.Label>
                        <Form.Control
                            type="number"
                            ref={seedRef}
                            placeholder="Un numero con mas de 3 digitos"
                            required
                        >
                        </Form.Control>
                        <Form.Label>Semilla X1: </Form.Label>
                        <Form.Control
                            type="number"
                            ref={seed1Ref}
                            placeholder="Otro numero con la misma cantidad de digitos"
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