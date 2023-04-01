import { Col } from "react-bootstrap";

function ProjectCards({title, description, imgUrl}) {
    return (
        <Col sm={6} md={4}>
            <div className="proj-imgbx" >
                <img src={imgUrl} />

            </div>
            <div className="proj-imgbx" >
                <h4>{title}</h4>
                <span>{description}</span>
            </div>
        </Col>
    )
}

export default ProjectCards;