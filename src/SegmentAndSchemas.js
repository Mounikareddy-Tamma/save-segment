import { useState } from "react"
import AddSchemas from "./AddSchemas"
import { Col, Container, Row } from "react-bootstrap"

function SegmentAndSchemas() {
    const [show, setShow] = useState(false)
    const handleSegmentData = () => {
        setShow(true)
    }
    return (
        <>
            <Container>
                <Row>
                    <Col className="mt-4">
                        <button className="btn btn-success" onClick={() => handleSegmentData()}>Save Segment</button>
                    </Col>
                </Row>

            </Container>
            {show &&
                <AddSchemas show={show} closeModal={() => setShow(false)} />
            }
        </>
    )

}
export default SegmentAndSchemas