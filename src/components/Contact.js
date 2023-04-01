import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";


function Contact() {
    const formInitialDetails = {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        phone: ''

    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const[buttonText, setButtonText] = useState('send');
    const [status, SetStatus] = useState({})

    const onFormUpdate = (category, value) => {
        setFormDetails({
            // update the field based o the value we pass in
            ...formDetails,
            [category] : value
        })
    }

    const handleSubmit = async (e) => {
        // avoid default submission on submit
        e.preventDefault();
        setButtonText('Sending...');
        let response = await fetch("https://localhost:3000/contact", {
            method:"POST",
            headers: {
                "Content-Type" : "Application/json;charset=utf-8"
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("send")
        let result = response.json();
        // set form back to initial state
        setFormDetails(formInitialDetails);
        if (result.code == 200) {
            SetStatus({success:true ,message: 'Message was sent successfully'}) ;
        } else {
            SetStatus({success:false ,message: 'Something went Wrong Please Try again'});
        }

         
    }

    return (
        <section id="contact" className="contact">
            <Container>
                <Row className="align-items-center" >
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us" />
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.firstname} placeholder="First Name" onChange={e => onFormUpdate('firstname', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.lastname} placeholder="Last Name" onChange={e => onFormUpdate('lastname', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="Email Address" onChange={e => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="tel" value={formDetails.phone} placeholder="Phone" onChange={e => onFormUpdate('phone', e.target.value)} />
                                </Col>
                                <Col>
                                    <textarea row="6" value={formDetails.message} placeholder="Message" onChange={e => onFormUpdate('message', e.target.value)}></textarea>
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                {
                                        status.message && 
                                        <Col>
                                            <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                         </Col>
                                    }
                            </Row>
                        </form>
                        
                    </Col>
                </Row>
            </Container>
        </section>
    )

}

export default Contact;