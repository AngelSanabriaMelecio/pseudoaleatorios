import { useRef, useState, useEffect } from "react"
import { Button, Container, Form } from "react-bootstrap"



export function ConAdView() {

    const nRef = useRef()
    const gRef = useRef()
    const mRef = useRef()

    const [generated, setGenerated] = useState([])
    const [seeds, setSeeds] = useState([])

    useEffect(()=>{
        pushN(5)
    },[])

    function handleSubmit(e) {
        e.preventDefault()

        var m = Number(mRef.current.value)
        
        let repe = []
        let message = ''
        seeds.map(s => {
            let v = Number(s.value)
            if( !v || v === 0)
                message = 'Llena todos los campos' 
            if( repe.includes(v)  )
                message = 'Igrese numeros diferentes' 
            repe.push( v )    
        })

        if( message )
        {
            alert(message)
            return
        }
        if (m <= 0 ) return


        let gen = [ seeds.map( s => s.value ) ]
        let N = nRef.current.value
        for( let i=0; i<N; i++ )
        {
            let n1 = Number(seeds[i].value)
            let n2 = Number(seeds[N-i-1].value)

            gen.push((n1 + n2)%m)  
        }
        setGenerated( format(gen) )
    }
    function handleXChange(event,index) {
        let data = [...seeds]
        data[index] = {value:event.target.value}
        setSeeds(data)
    }

    function format( gen ){
        let m = mRef.current.value
        let newGen = []
        gen.map( item =>  newGen.push((item/(m-1)).toFixed(5)) )
        return newGen
    }
    
    function pushN( n ) {
        let newSeeds = [...seeds ]
        for( let i=0; i<n; i++ )
            newSeeds.push( {value:''} )
        setSeeds(newSeeds)
    }
    function popN() {
        let newSeeds = seeds.slice(0, seeds.length - 1);
        setSeeds(newSeeds)
    }
    function handleGChange(event){
        
        let num = event.target.value
        mRef.current.value = num ? Math.pow(2,num) : ''
    }

    return (
        <Container>
            <h2>Aditivo</h2>
            <Form className="form">
                <div className="form-row">
                    <Form.Group>
                        <div className="half" >
                            <Form.Label>N</Form.Label>
                            <div className="form-row">
                                <Form.Control
                                    type="number"
                                    ref={nRef}
                                    placeholder="Numeros En la Secuencia"
                                    disabled={true}
                                    value={ seeds.length > 0 ? seeds.length : '' }
                                    required
                                >
                                </Form.Control>
                                <Button onClick={popN}>-</Button>
                                <Button onClick={ ()=>pushN(1) }>+</Button>
                            </div>
                        </div>
                        <div>
                            <Form.Label>X:</Form.Label>
                            { seeds.map( (s,i) =>
                                <div key={i} className="mb-2">
                                    <Form.Control
                                        type="number"
                                        placeholder="Un entero"
                                        onChange={(e) => handleXChange(e,i)}
                                        value={s.value}
                                        required
                                    >
                                    </Form.Control>
                                </div>     
                            ) }
                        </div>

                        <div className="form-row" >
                            <div>
                                <Form.Label>g:</Form.Label>
                                <Form.Control
                                    type="number"
                                    ref={gRef}
                                    placeholder="Un entero menor a 25"
                                    onChange={ (e) => handleGChange(e) }
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
                                    required
                                    disabled
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