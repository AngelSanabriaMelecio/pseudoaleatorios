import { useRef, useState, useEffect } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useAppContext } from "../context/AppContext"

export function ConLinView() {

    useEffect(() => {
        let desc = []
        let prime = []
        for (let i = 2; i < 3000; i++) {
            if (desc.includes(i)) continue
            prime.push(i);
            for (let j = i + i; j < 3000; j += i) {
                desc.push(j)
            }
        }
        setPrime(prime)
    }, [])

    const xRef = useRef()
    const gRef = useRef()
    const mRef = useRef()
    const cRef = useRef()
    const kRef = useRef()
    const aRef = useRef()

    const { generated, setGenerated } = useAppContext()
    const [prime, setPrime] = useState([]);
    const [primeSelected, setPrimeSelected] = useState(0)

    function handleSubmit(e) {
        e.preventDefault()

        var X0 = Number(xRef.current.value)
        var m = Number(mRef.current.value)
        var c = Number(cRef.current.value)
        var a = Number(aRef.current.value)

        if (X0 === 0 || m === 0 || c === 0 || a === 0) return

        let gen = []
        while (true) {
            let X1 = (a * X0 + c) % m
            if (gen.includes(X1)) break
            gen.push(X1)
            X0 = X1
        }
        setGenerated(format(gen))
    }
    function handleGChange(event) {
        let num = event.target.value
        mRef.current.value = num ? Math.pow(2, num) : ''
    }
    function handleKChange(event) {
        let num = event.target.value
        aRef.current.value = num ? 1 + 4 * num : ''
    }
    function prevPrime() {
        if (primeSelected === 0) return
        cRef.current.value = prime[primeSelected - 1]
        setPrimeSelected((prev) => prev > 1 ? prev - 1 : 1)
    }
    function nextPrime() {
        cRef.current.value = prime[primeSelected + 1]
        setPrimeSelected((prev) => prev + 1)
    }
    function format(gen) {
        let m = mRef.current.value
        let newGen = []
        gen.map(item => newGen.push((item / (m - 1)).toFixed(5)))
        return newGen
    }

    return (
        <Container>
            <h2>Lineal</h2>
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
                                    required
                                >
                                </Form.Control>
                            </div>
                            <div>
                                <Form.Label>c:</Form.Label>
                                <div className="form-row">
                                    <Form.Control
                                        type="number"
                                        ref={cRef}
                                        placeholder="Es Relativo Primo a m"
                                        disabled={true}
                                        required
                                    >
                                    </Form.Control>
                                    <Button
                                        onClick={prevPrime}>Prev</Button>
                                    <Button
                                        onClick={nextPrime}>Sig</Button>
                                </div>
                            </div>
                        </div>
                        <div className="form-row" >
                            <div>
                                <Form.Label>k:</Form.Label>
                                <Form.Control
                                    type="number"
                                    ref={kRef}
                                    placeholder="Un entero"
                                    onChange={(e) => handleKChange(e)}
                                    required
                                >
                                </Form.Control>
                            </div>
                            <div>
                                <Form.Label>a:</Form.Label>
                                <Form.Control
                                    type="number"
                                    ref={aRef}
                                    placeholder="Se calcula: 1 + 4k"
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
                            <div className="pseudo"  >
                                { g }
                            </div>
                        </div>
                    )}
                </div>
            </Form>
        </Container>
    )

}