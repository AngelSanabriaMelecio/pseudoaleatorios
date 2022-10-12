import { Container, Nav, Navbar as NavBarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function AppBar() {
    return (
        <NavBarBs className="bd-white shadow-sm mb3">
            <Container>
                <Nav>
                    <div>
                        <div style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                            <h5>Algoritmos No Congruenciales</h5>
                            <div style={{ display:'flex' ,flexDirection: 'column' }}>
                                <Nav.Link to="/CuadMed" as={NavLink}>
                                    Cuadrados Medios
                                </Nav.Link>
                                <Nav.Link to="/ProdMed" as={NavLink}>
                                    Productos Medios
                                </Nav.Link>
                                <Nav.Link to="/MultCons" as={NavLink}>
                                    Multiplicador Constante
                                </Nav.Link>
                            </div >
                        </div>
                        <div style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>

                            <h5>Algoritmos Congruenciales</h5>
                            <h6>Lineales</h6>
                            <div style={{display:'flex' , flexDirection: 'column' }}>
                                <Nav.Link to="/ConLin" as={NavLink}>
                                    Lineal
                                </Nav.Link>
                                <Nav.Link to="/ConMult" as={NavLink}>
                                    Multiplicativo
                                </Nav.Link>
                                <Nav.Link to="/ConAd" as={NavLink}>
                                    Aditivo
                                </Nav.Link>
                            </div>
                            <h6>Cuadraticos</h6>
                            <div style={{display:'flex' , flexDirection: 'column' }}>
                                <Nav.Link to="/Cuad" as={NavLink}>
                                    Cuadratico
                                </Nav.Link>
                                <Nav.Link to="/BlomBlom" as={NavLink}>
                                    Blom Blom
                                </Nav.Link>
                            </div>
                        </div>
                    </div>
                </Nav>
            </Container>
        </NavBarBs>
    )
}