import React, { useEffect, useState } from 'react'
import './inventroyManage.css';
import { Chart, Series } from 'devextreme-react/chart';
import 'devextreme/dist/css/dx.light.css';
import './inventroyManage.css';
import { Button, Form, Modal, Row, InputGroup, Col, Table, NavDropdown, Container, Nav, Navbar, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";
function ChartBusiness() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fatchdata(id);
    }, [id])

    const fatchdata = async () => {
        try {
            const res = await axios.get("https://inventory-api.vercel.app/getRecordByBusinessId/" + id);
            console.log(res.data);
            setData(res.data);
            // fatchdata();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Explore Your Buiness</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Chart id='chartBar'
                            dataSource={data}
                            title="Transaction Summary"
                        >
                            <Series
                                valueField="in"
                                argumentField="year"
                                name="Cash In"
                                type="bar"
                                color="#28a745"
                            />
                            <Series
                                valueField="out"
                                argumentField="year"
                                name="Cash Out"
                                type="bar"
                                color="#dc3545"
                            />
                        </Chart>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ChartBusiness