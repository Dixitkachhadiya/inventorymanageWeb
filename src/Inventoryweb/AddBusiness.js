import React, { useEffect, useState } from 'react';
import './inventroyManage.css'
import { Button, Form, Modal, Row, InputGroup, Col, Table, NavDropdown, Container, Nav, Card, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { BsFillPencilFill, BsFillTrash3Fill, BsVectorPen } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import Swal from 'sweetalert2';
import MenuBar from './MenuBar';
import { useAuth } from './Authentication';

function AddBusiness() {
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const [AddBusiness, setAddBusiness] = useState("");
    const [showBusinessRecord, setshowBusinessRecord] = useState([]);
    const auth = useAuth();
    const handleClose = () => {
        setAddBusiness('');
        setShow(false);

    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        facthAllRecord();
    }, [])

    const addBusinessCategory = async () => {
        debugger
        var businessCategoryName = {
            business_name: AddBusiness
        };
        try {
            var res = await axios.post('https://inventory-api.vercel.app/insertBusinessCategory', businessCategoryName);
            setAddBusiness('');
            setShow(false);
            Swal.fire({
                title: "Add Category",
                text: "Business Category Are Added Successfully",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
        }
        facthAllRecord();
    }

    const facthAllRecord = async () => {
        debugger
        try {
            var res = await axios.get('https://inventory-api.vercel.app/getAllbuisnessRecord');
            setshowBusinessRecord(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async (id) => {
        try {
            var res = await axios.delete('https://inventory-api.vercel.app/deleteRecordByid/' + id);
            // alert('one Record Deleted Successfully');
            Swal.fire({
                title: "Delete",
                text: "Record Are Deleted Successfully",
                icon: "warning"
            });
        } catch (error) {
            console.log(error)
        }
        facthAllRecord();
    }

    return (
        <>
            <MenuBar></MenuBar>
            <br></br>
            <h1 className='business-name'>Welcome! <h1 style={{ color: 'blue' }}>{user?.name}</h1></h1>
            <Container>
                <Row>
                    <Col md={4}>
                        <Button variant="primary" onClick={handleShow} id='buisness_category_button'>
                            <FaBusinessTime /> Add Business
                        </Button>

                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Business</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label id='business-category-name'>Add Business</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Add Business"
                                                onChange={(e) => setAddBusiness(e.target.value)}
                                                value={AddBusiness}

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={addBusinessCategory}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
                <br></br><br></br>

                <Row>

                    {
                        showBusinessRecord.map((item) =>
                            <Col md={3}>
                                <Card style={{ width: '20rem' }} id='card'>

                                    <Card.Body>
                                        <Card.Title >Business Id : {item.business_id}</Card.Title>
                                        <Card.Text id='card-text' as={Link} to={`/Buisness/${item.business_id}`} >
                                            Business Name : {item.business_name}
                                        </Card.Text><br></br><br></br>
                                        <Button variant="danger" onClick={() => handleDelete(item.business_id)}><BsFillTrash3Fill /> Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }

                    <Col md={4}>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddBusiness