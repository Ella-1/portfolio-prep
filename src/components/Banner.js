import { useState, useEffect } from "react";
import { Container ,Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';

function Banner() {
    // the loopnumer helps in looping and desplaying which wor is o the screen
    const [loopNum, setLoopNum] = useState(0);
    // word being typed out or deleted out
    const [isDeleting, SetIsDeleting] = useState(false) // it is false because we start by typing the word
    const toRotate = ['Software Engineer', 'Web Developer', 'Devops Engineer'];
    const [text, setText] = useState(''); // the portion of the word displayed on typing
    const period = 2000; // time passing btw letters tyrped out
    // determines how fast one letter comes before another
    const [delta, setDelta] = useState(300 - Math.random() * 100)
    // Function to take care of typing or deleating
    useEffect(() => {
        let ticker = setInterval(() => {
             tick();
        }, delta ) // delta is the interval for the tyming
        // clears intervalafter typing
        return () => { clearInterval(ticker)};
    }, [text]) // we want it to run every time the text gets updated

    //defining tick function
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length-1) : fullText.substring(0, text.length +1)
        // set state to our updated text
        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2)
        }

        if(! isDeleting  && updatedText === fullText) {
             SetIsDeleting(true);
             setDelta(period)
        } else if ( isDeleting && updatedText === '' ) {
            SetIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }   

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{`I'm  Bata `} <span className="wrap">{text}</span></h1>
                        <p>I am super exited to meet you have fun scrollig through my page</p>
                        <button onClick={ () => console.log('Connect')}>Let's connect <ArrowRightCircle size={25} /> </button>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header img" ></img>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner;
