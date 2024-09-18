import React, { useEffect, useState } from 'react'
import './inventroyManage.css';
import { Button, Form, Modal, Row, InputGroup, Col, Table, NavDropdown, Container, Nav, Navbar, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";
import { BsFillPencilFill, BsFillTrash3Fill, BsVectorPen } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { FaChartLine, FaChartBar } from "react-icons/fa";
import { TbWalletOff } from "react-icons/tb";
import Swal from 'sweetalert2';
import { IoStatsChart } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Buiness() {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setCategoryType("");
        setbusinessCategoryName("");
        setShow(false);
    };
    const handleShow = () => setShow(true);

    // Const For Show Cash in Popup
    const [showCashIn, setShowCashIn] = useState(false);
    const handleCashInClose = () => {
        setCashIndate("");
        setSelectCashInCategory("");
        setCashinAmount("");
        setcashInRemark("");
        setShowCashIn(false);
    }
    const handleCashInShow = () => setShowCashIn(true);


    // const for Show Cash Out Popup
    const [showCashOut, SetShowCashOut] = useState(false);
    const handleCashOutClose = () => {
        setCashOutdate("");
        setSelectCashOutCategory("");
        setCashOutAmount("");
        setcashOutRemark("");
        SetShowCashOut(false);

    }
    const handleCashOutShow = () => SetShowCashOut(true);



    // const for AddBuisness.js Record
    const { id } = useParams();
    const [business, setBusiness] = useState({});
    const [showBusinessCategoryRecord, setshowBusinessCategoryRecord] = useState([]);
    const [getCashInRecord, setGetCashInRecord] = useState([]);
    const [getCashOutRecord, setGetCashOutRecord] = useState([]);


    const [businessCategoryName, setbusinessCategoryName] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [cashInDate, setCashIndate] = useState("");
    const [cashInRemark, setcashInRemark] = useState("");
    const [selectCashInCategory, setSelectCashInCategory] = useState("");
    const [cashInAmount, setCashinAmount] = useState("");
    const [cashOutDate, setCashOutdate] = useState("");
    const [cashOutRemark, setcashOutRemark] = useState("");
    const [selectCashoutCategory, setSelectCashOutCategory] = useState("");
    const [cashOutAmount, setCashOutAmount] = useState("");
    const [category_type, setCategory_Type] = useState("");
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [netBalance, setNetBalance] = useState(0);
    const [currentmode, setCurrentmode] = useState("submit");
    const [tid, settid] = useState("");


    useEffect(() => {
        fatchBusiness();
        // getBusinessCategoreyRecord();
        // getCashInRecordInOption();
        // getCashOutRecordInOption();
    }, [id]);

    useEffect(() => {
        getBusinessCategoreyRecord();
        getCashInRecordInOption();
        getCashOutRecordInOption();
        // addFinacialrecord();
    }, []);



    const fatchBusiness = async () => {
        debugger
        try {
            var res = await axios.get('https://inventory-api.vercel.app/getAllbusinessRecordByid/' + id);
            setBusiness(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddCategory = async () => {
        // debugger
        const addData = {
            add_business_id: id,
            business_category_name: businessCategoryName,
            buiness_category_type: categoryType
        }
        try {
            var res = await axios.post('https://inventory-api.vercel.app/insertRecord', addData);
            setbusinessCategoryName("");
            setShow(false);
            Swal.fire({
                title: "Add Category",
                text: `${business.business_name} Business Category Are Added Successfully`,
                icon: "success"
            });
        } catch (error) {
            console.log(error);
        }
        // getBusinessCategoreyRecord();
    }

    const getBusinessCategoreyRecord = async () => {
        debugger
        try {
            var res = await axios.get("https://inventory-api.vercel.app/getInsertedRecord/" + id);
            setshowBusinessCategoryRecord(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        // debugger
        try {
            var res = await axios.delete("https://inventory-api.vercel.app/deleteBusinessCategoryRecord/" + id);
            // alert("One Record Deleted Successfully");
            getBusinessCategoreyRecord();
            Swal.fire({
                title: "Delete",
                text: `${business.business_name} Business One Record is Deleted Successfully`,
                icon: "warning"
            });

        } catch (error) {
            console.log(error);
        }
        // getBusinessCategoreyRecord();

    }

    const getCashInRecordInOption = async () => {
        // debugger
        try {
            var res = await axios.get("https://inventory-api.vercel.app/getCashInCategory/" + id);
            setGetCashInRecord(res.data);
            getCashInRecordInOption();
        } catch (error) {
            console.log(error);
        }
        // getCashInRecordInOption();
    }

    const getCashOutRecordInOption = async () => {
        // debugger
        try {
            var res = await axios.get("https://inventory-api.vercel.app/getCashOutCategory/" + id);
            setGetCashOutRecord(res.data);
            getCashOutRecordInOption();
        } catch (error) {
            console.log(error);
        }
        // getCashOutRecordInOption();
    }



    const handCashIn = async () => {
        debugger
        const cashInRecord = {
            add_business_id: parseInt(id),
            business_category_id: selectCashInCategory,
            transaction_date: cashInDate,
            category_type: "Cash In",
            transaction_remark: cashInRemark,
            transaction_amount: parseInt(cashInAmount)
        }
        if (currentmode === "submit") {
            try {
                debugger
                var res = await axios.post("https://inventory-api.vercel.app/insertCashInAndOutRecord", cashInRecord);
                setShowCashIn(false);
                setcashInRemark("");
                setCashIndate("");
                setSelectCashInCategory("");
                setCashinAmount("");
                getBusinessCategoreyRecord();
                // setIncome(prev => parseFloat(prev) + parseFloat(cashInAmount));
                // setNetBalance(prev => parseFloat(prev) + parseFloat(cashInAmount));
                Swal.fire({
                    title: "Cash In",
                    text: "Cash In Record Are Enter Successfully",
                    icon: "success"
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                debugger
                var res = await axios.put(`https://inventory-api.vercel.app/updateCashInAndOutRecord/${tid} `, cashInRecord);
                console.log(res.data);
                setcashInRemark("");
                setCashIndate("");
                setSelectCashInCategory("");
                setCashinAmount("");
                setCurrentmode("submit");
                // setIncome(prev => parseFloat(prev) + parseFloat(cashInAmount));
                // setNetBalance(prev => parseFloat(prev) + parseFloat(cashInAmount));
                Swal.fire({
                    title: `${business.business_name} Business Record`,
                    text: "Cash In One Record Updated Successfully",
                    icon: "success"
                });
                getBusinessCategoreyRecord();
            } catch (error) {
                console.log(error);
            }
            setShowCashIn(false);
        }


    }

    const handleCashOut = async () => {
        debugger
        const CashOutRecord = {
            add_business_id: parseInt(id),
            business_category_id: selectCashoutCategory,
            transaction_date: cashOutDate,
            category_type: "Cash Out",
            transaction_remark: cashOutRemark,
            transaction_amount: parseInt(cashOutAmount)
        }

        if (currentmode === "submit") {
            try {
                // debugger
                var res = await axios.post("https://inventory-api.vercel.app/insertCashInAndOutRecord", CashOutRecord);
                // setExpense(prev => parseFloat(prev) + parseFloat(cashOutAmount));
                // setNetBalance(prev => parseFloat(prev) - parseFloat(cashOutAmount));
                setCashOutdate("");
                setCashOutAmount("");
                setcashOutRemark("");
                setSelectCashOutCategory("");
                SetShowCashOut(false);
                getBusinessCategoreyRecord();
                Swal.fire({
                    title: "Cash Out",
                    text: "Cash Out Record Are Enter Successfully",
                    icon: "info"
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                var res = await axios.put(`https://inventory-api.vercel.app/updatecashinandoutRecord/${tid}`, CashOutRecord);
                setCashOutdate("");
                setCashOutAmount("");
                setcashOutRemark("");
                setSelectCashOutCategory("");
                SetShowCashOut(false);
                // setExpense(prev => parseFloat(prev) + parseFloat(cashOutAmount));
                // setNetBalance(prev => parseFloat(prev) - parseFloat(cashOutAmount));
                setCurrentmode("submit");
                getBusinessCategoreyRecord();
                Swal.fire({
                    title: `${business.business_name} Business Record`,
                    text: "Cash Out One Record Updated Successfully",
                    icon: "success"
                });
            } catch (error) {
                console.log(error);
            }
        }

    }


    const handleEdit = async (id) => {
        debugger
        try {
            var res = await axios.get("https://inventory-api.vercel.app/getRecordFromEditCashinout/" + id);
            console.log(res.data[0])
            const data = res.data[0];
            if (data.category_type === "Cash In") {
                setGetCashInRecord(res.data);
                setShowCashIn(true);
                setcashInRemark(data.transaction_remark);
                setCashIndate(data.transaction_date);
                setSelectCashInCategory(data.business_category_id);
                setCashinAmount(data.transaction_amount);
                settid(id);
                setCurrentmode("edit");
            } else if (data.category_type === "Cash Out") {
                setGetCashOutRecord(res.data);
                SetShowCashOut(true);
                setcashOutRemark(data.transaction_remark);
                setCashOutdate(data.transaction_date);
                setSelectCashOutCategory(data.business_category_id);
                setCashOutAmount(data.transaction_amount);
                settid(id);
                setCurrentmode("edit");
            }

        } catch (error) {
            console.log(error);
        }
    }


    // const totalBalance = showBusinessCategoryRecord.reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0);

    // const totalIncome = showBusinessCategoryRecord
    //     .filter(transaction => parseInt(transaction.transaction_amount) > 0)
    //     .reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0);

    // const totalExpenses = showBusinessCategoryRecord
    //     .filter(transaction => parseInt(transaction.transaction_amount) < 0)
    //     .reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0) * (-1);

    // const totalBalance = showBusinessCategoryRecord.reduce(
    //     (acc, transaction) => acc + parseInt(transaction.transaction_amount),
    //     0
    //   );

    //   const totalIncome = showBusinessCategoryRecord
    //     .filter(transaction => transaction.category_type === 'Cash In')
    //     .reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0);

    //   const totalExpenses = showBusinessCategoryRecord
    //     .filter(transaction => transaction.category_type === 'Cash Out')
    //     .reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0) * (-1);

    const totalIncome = showBusinessCategoryRecord
        .filter(transaction => transaction.category_type === 'Cash In')
        .reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0);

    const totalExpenses = showBusinessCategoryRecord
        .filter(transaction => transaction.category_type === 'Cash Out')
        .reduce((acc, transaction) => acc + parseInt(transaction.transaction_amount), 0);

    const totalBalance = totalIncome - totalExpenses;

    return (
        <>
            {[
                'success',
            ].map((variant) => (
                <Alert key={variant} variant={variant}>
                    {/* <div id='p-text-div'>
                        <h1 id='p1-text'>Glad to have you at Business of<p id='p2-text'> {business.business_name}</p></h1>
                    </div> */}
                    <h1 className='business-name'>Glad to have you at Business of {business.business_name}</h1>
                </Alert>
            ))}
            <br></br>
            <hr></hr>
            <Container>
                <Row>
                    <Form.Group className="mt-2" as={Col} md="4">
                        <Col sm={12} id='modal-lable'>Net Balance</Col>
                        <Col>
                            <Form.Control type='text' disabled placeholder='Net Balance' value={totalBalance} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mt-2" as={Col} md="4">
                        <Col sm={12} id='modal-lable'>Income</Col>
                        <Col>
                            <Form.Control type='text' disabled placeholder='Income' value={totalIncome} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mt-2" as={Col} md="4">
                        <Col sm={12} id='modal-lable'>Expain</Col>
                        <Col>
                            <Form.Control type='text' disabled placeholder='Explain' value={totalExpenses} />
                        </Col>
                    </Form.Group>
                </Row>
            </Container>

            <Container>

                <Row>
                    {/* Add CAtegory */}
                    <Col md={4} className='button-col'>
                        <Button variant="primary" onClick={handleShow} id='buisness_category_button' >
                            <BsVectorPen /> Add Category
                        </Button>
                    </Col>
                    <br></br>
                    {/* Cash In */}
                    <Col md={4} className='button-col'>
                        <Button variant="primary" onClick={handleCashInShow} id='buisness_category_button'>
                            <FaWallet /> Cash In
                        </Button>
                    </Col>
                    <br></br>
                    {/* Cash Out */}

                    <Col md={4} className='button-col'>
                        <Button variant='primary' onClick={handleCashOutShow} id='buisness_category_button'>
                            <TbWalletOff /> Cash out
                        </Button>
                    </Col>
                </Row>






                {/* Add Category */}
                <Row>
                    <Col md={4}>
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="validationCustom05">
                                            <Form.Label id="p3-text">Business</Form.Label><br></br>
                                            <Form.Control type='text' disabled value={business.business_name} />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Department Id
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom05">
                                            <Form.Check
                                                type='radio'
                                                label="Cash In"
                                                name='radio'
                                                value={categoryType}
                                                checked={categoryType === "Cash In"}
                                                onChange={(e) => setCategoryType("Cash In")}></Form.Check>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom05">
                                            <Form.Check
                                                type='radio'
                                                label="Cash Out"
                                                name='radio'
                                                value={categoryType}
                                                checked={categoryType === "Cash Out"}
                                                onChange={(e) => setCategoryType("Cash Out")}
                                            ></Form.Check>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="validationCustom05">
                                            <Form.Label id="p3-text">Business Category Name</Form.Label><br></br>
                                            <Form.Control type='text' value={businessCategoryName} onChange={(e) => setbusinessCategoryName(e.target.value)} />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Department Id
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleAddCategory}>
                                    Add
                                </Button>
                            </Modal.Footer>

                        </Modal>
                    </Col>
                </Row>

                {/* Cash In */}
                <Row>
                    <Col md={4}>
                        <Modal show={showCashIn} onHide={handleCashInClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Cash In</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="formDate">
                                        <Form.Label id="p3-text"> Cash In Date</Form.Label>
                                        <Form.Control type="date" value={cashInDate} onChange={(e) => setCashIndate(e.target.value)} />

                                    </Form.Group>
                                    {/* <Form.Group controlId="formText">
                                        <Form.Label id="p3-text">Remark</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Remark"
                                        ></Form.Control>
                                    </Form.Group> */}
                                    <Form.Group controlId='formSelect'>
                                        <Form.Label id="p3-text">Cash In Category</Form.Label>
                                        <Form.Select as="select" value={selectCashInCategory} onChange={(e) => setSelectCashInCategory(e.target.value)}>
                                            <option value="">Select Category</option>
                                            {
                                                getCashInRecord.map((item) =>
                                                    <option value={item.buisness_id}>{item.business_category_name}</option>
                                                )}

                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label id="p3-text">Remark</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Remark" value={cashInRemark} onChange={(e) => setcashInRemark(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formNumber">
                                        <Form.Label id="p3-text">Cash In Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Amount"
                                            value={cashInAmount}
                                            onChange={(e) => setCashinAmount(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCashInClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handCashIn}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>


                {/* Cash Out */}

                <Row>
                    <Col md={4}>
                        <Modal show={showCashOut} onHide={handleCashOutClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Cash out
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="formDate">
                                        <Form.Label id="p3-text">Cash Out Date</Form.Label>
                                        <Form.Control type="date" value={cashOutDate} onChange={(e) => setCashOutdate(e.target.value)} />

                                    </Form.Group>
                                    {/* <Form.Group controlId="formText">
                                        <Form.Label id="p3-text">Remark</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Remark"
                                        ></Form.Control>
                                    </Form.Group> */}
                                    <Form.Group controlId='formSelect'>
                                        <Form.Label id="p3-text">Cash Out Category</Form.Label>
                                        <Form.Select as="select" value={selectCashoutCategory} onChange={(e) => setSelectCashOutCategory(e.target.value)}>
                                            <option value="">Select Category</option>
                                            {

                                                getCashOutRecord.map((item) =>
                                                    <option value={item.buisness_id}>{item.business_category_name}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label id="p3-text">Remark</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Remark" value={cashOutRemark} onChange={(e) => setcashOutRemark(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formNumber">
                                        <Form.Label id="p3-text">Cash Out Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Amount"
                                            value={cashOutAmount}
                                            onChange={(e) => setCashOutAmount(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCashOutClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleCashOut}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>

            {/* Show Table */}
            <Container>
                <div className="table-responsive">
                    <h1><Link as={Link} to={`/ChartBusiness/${business.business_id}`}>Click To Show Cash In And Out By Using Chart<FaChartBar id='chart' /></Link></h1>
                    <br></br>
                    <Table striped bordered hover className="custom-table">
                        <thead>
                            <tr>
                                <th>Trancation Id</th>
                                <th>Transaction Date</th>
                                <th>Businessc Category Name</th>
                                <th>Category Type</th>
                                <th>transaction Remark</th>
                                <th>Trancation Amount</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showBusinessCategoryRecord.map((item) =>
                                    <tr>
                                        <td>{item.transaction_id}</td>
                                        <td>{item.transaction_date}</td>
                                        <td>{item.business_category_id}</td>
                                        <td>{item.category_type}</td>
                                        <td>{item.transaction_remark}</td>
                                        <td>{item.transaction_amount}</td>
                                        <td><Button variant='success' onClick={() => handleEdit(item.transaction_id)}><BsFillPencilFill /> Edit</Button></td>
                                        <td><Button variant='danger' onClick={() => handleDelete(item.transaction_id)}><BsFillTrash3Fill /> Delete</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}

export default Buiness