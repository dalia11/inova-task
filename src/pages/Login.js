import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Nav } from "react-bootstrap";
import '../App.css';
import { Link } from 'react-router-dom';
import axios from "../axios.js";
import PhoneCode from 'react-phone-code';
const Login = props => {
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState({});
    const [email, setemail] = useState("");
    const [validated, setValidated] = useState(false);
    const [flag, setflag] = useState(false);
    const [tab, settab] = useState("phone");
    const [phone, setphone] = useState("");
    const [code, setcode] = useState("+20");
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        let body;
        if (tab === 'mail') {
            body = {
                user: {
                    password: Password,
                    email: email,
                },
                device: {
                    uid: "3",
                    token: "i"
                }
            }
            axios.post('/login_by_email', body)
                .then(response => {
                    axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.user.access_token}`;
                    localStorage.setItem('token', response.data.data.user.access_token);
                    //user data should be passed to profile page
                    props.history.replace('/feed');
                })
                .catch(error => {
                    //wrong email or password
                    if (error.response != undefined) {
                        setError(Error => {
                            let err = { ...Error }
                            err.login = error.response.data.message;
                            Error = err;
                            return Error;
                        })
                    } else {
                        console.log(error)
                    }
                })
        } else {
            body = {
                user: {
                    password: Password,
                    phone_number: phone,
                    country_code: code,
                },
                device: {
                    uid: "3",
                    token: "i"
                }
            }
            axios.post('/login_by_phone', body)
                .then(response => {
                    axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.user.access_token}`;
                    localStorage.setItem('token', response.data.data.user.access_token);
                    //user data should be passed to profile page
                    props.history.replace('/feed');
                })
                .catch(error => {
                    //wrong email or password
                    if (error.response != undefined) {
                        setError(Error => {
                            let err = { ...Error }
                            err.login = error.response.data.message;
                            Error = err;
                            return Error;
                        })
                    } else {
                        console.log(error)
                    }
                })
        }

    };
    const handleProcess = () => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!email.match(pattern)) {
            setError(Error => {
                let err = { ...Error }
                err.email = "Please enter valid email address.";
                Error = err;
                return Error;
            })
        }
        else {
            setflag(true)
        }
    }
    return (
        <>
            <div className="auth-container" >
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form col-xl-4 col-md-5">
                    <div className="mb-5 text-center" >
                        <h1 >trendo</h1>
                        <h6 >login</h6>
                    </div>
                    <Nav variant="tabs" className="mb-3" defaultActiveKey={tab}>
                        <Nav.Item onClick={() => settab('phone')}>
                            <Nav.Link eventKey="phone">Phone</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => { settab('mail'); setflag(false) }}>
                            <Nav.Link eventKey="mail" >Email</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {flag === false ? tab === 'mail' ? <>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Col sm="12">
                                <Form.Control
                                    maxLength="100"
                                    required
                                    type="text"
                                    placeholder="Email@something.com"
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                        setError('')
                                    }}
                                />
                                {Error ? <Form.Text id="emailerror" className="text-danger">{Error.email}  </Form.Text> : null}

                            </Col>
                        </Form.Group>
                        <Button onClick={() => handleProcess()} className="mt-3 btn-custom"
                            disabled={!email}>Continue</Button>
                    </> :
                        <>

                            <Form.Row>
                                <Col sm="3">
                                    <Form.Group controlId="formPlaintextcode">
                                        <PhoneCode
                                            onSelect={code => setcode(code)} // required
                                            showFirst={['EG']}
                                            defaultValue='' />
                                    </Form.Group>
                                </Col>

                                <Col sm="8">
                                    <Form.Group controlId="formPlaintextPhone">
                                        <Form.Control
                                            maxLength="11"
                                            minLength="11"
                                            required
                                            type="text"
                                            placeholder="ex: 012345678910"
                                            onChange={(e) => {
                                                setphone(e.target.value);
                                                setError('')
                                            }}
                                        />
                                        {Error ? <Form.Text id="phoneerror" className="text-danger">{Error.phone}  </Form.Text> : null}
                                    </Form.Group>
                                </Col>

                            </Form.Row>

                            <Button onClick={() => setflag(true)} className="mt-3 btn-custom"
                                disabled={phone.length < 10}>Continue</Button>
                        </>
                        : null}
                    {flag === true ? <>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Col sm="12">
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('')
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required.</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {Error ? <Form.Text id="emailerror" className="text-danger text-center">{Error.login}  </Form.Text> : null}
                        <Button type="submit" className="mt-3 btn-custom"
                            disabled={!Password}>Log in </Button>
                        <Link to='#' style={{ color: '#003068' }}>Forget your password?</Link>
                        <Link to='/' className="text-center">back</Link>
                    </>
                        : null}
                </Form>
            </div>
        </>
    );
};

export default Login;