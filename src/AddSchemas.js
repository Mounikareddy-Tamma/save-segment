import { useState } from "react"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import Select from "react-select"
import Swal from "sweetalert2"
function AddSchemas({ show, closeModal }) {
    const [segmentName, setSegmentName] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedSchemas, setSelectedSchemas] = useState([])
    const [newlyAdded, setNewlyAdded] = useState(null)
    const Options = [
        { label: "First Name", value: "first_name" },
        { label: "Last Name", value: "last_name" },
        { label: "Gender", value: "gender" },
        { label: "Age", value: "age" },
        { label: "Account Name", value: "account_name" },
        { label: "City", value: "city" },
        { label: "State", value: "state" },
    ]
    const addNewSchema = () => {
        if (segmentName !== "") {
            if (!selectedOption) {
                Swal.fire({ text: "Please select schema", icon: "info" })
                return;
            };

            setSelectedSchemas((prev) => {
                let updated = [...prev, selectedOption]
                setNewlyAdded(updated?.length - 1)
                return updated
            })
            setSelectedOption('')
        } else {
            Swal.fire({ text: "Please enter segment name", icon: "warning" })
            return;
        }
    }
    const availableOptions = () => {
        return Options?.filter(item => !selectedSchemas?.some((key) => key.value == item.value))
    }
    const getAvailableOptions = (index) => {
        const selectedValues = selectedSchemas
            .filter((_, i) => i !== index) // exclude current dropdown
            .map(opt => opt?.value);
        return Options.filter(opt => !selectedValues.includes(opt.value));
    };
    const removeSchema = (key) => {
        let updatedSchemas = selectedSchemas?.filter((item) => item.value != key.value)
        setSelectedSchemas(updatedSchemas)
    }
    const saveSegment = () => {
        if (!segmentName || selectedSchemas?.length == 0) {
            Swal.fire({ text: 'You should enter segment name and select at least one schema', icon: 'warning' })
            return;
        }
        let payload = {
            "segment_name": segmentName,
            "schema": selectedSchemas?.map(item => ({
                [item.value]: item.label
            }))
        }
        let URL = "https://webhook.site/c3553bf3-a0c7-41d7-868c-8762bd969a20"
        fetch(URL, {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}),
            body: JSON.stringify(payload)
        }).then(res => {
            if (res.ok) {
                Swal.fire({ text: 'Segment Saved Successfully!', icon: 'success' })
                closeModal();
            } else {
                Swal.fire({ text: 'Failed to send data', icon: 'error' })
            }
        }).catch(err => {
            Swal.fire({ text: 'Error while sending data', icon: 'error' })
        })

    }
    return (
        <>
            <Modal show={show} size="lg">
                <Modal.Title>
                    <div
                        style={{
                            backgroundColor: "#4db6ac",
                            color: "white",
                            padding: "10px 15px",
                            display: "flex",
                            alignItems: "center",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                        }}
                    >
                        <h5 className="mb-0">Saving Segment</h5></div>
                </Modal.Title>
                <Modal.Body>
                    <Form.Label>
                        Enter the Name of the Segment
                    </Form.Label>
                    <Form.Group>
                        <input name="segmentName" value={segmentName} className="form-control" autoComplete="off" placeholder="Name of the Segment" onChange={(e) => setSegmentName(e.target.value)} />
                    </Form.Group>
                    <span className="mt-2 mb-2">To save your segment, you need to add the schemas to build the query</span>
                    {selectedSchemas?.length > 0 &&
                        <Card className="shadow-sm mt-4 mb-4 p-3">
                            {selectedSchemas?.map((key, index) => {
                                return (
                                    <div key={index} className="mb-2 d-flex align-items-center justify-content-between">
                                        <div className="flex-grow-1 me-2">
                                            <Select
                                                options={getAvailableOptions(index)}
                                                onChange={(option) => {
                                                    if (option !== null) {
                                                        let updated = [...selectedSchemas]
                                                        updated[index] = option
                                                        setSelectedSchemas(updated)
                                                    } else {
                                                        setSelectedOption("")
                                                    }
                                                }}
                                                getOptionLabel={option => option.label}
                                                getOptionValue={option => option.value}
                                                isDisabled={index != newlyAdded}
                                                value={key}
                                            /></div>
                                        <button className="btn btn-danger btn-sm " onClick={() => removeSchema(key)}>-</button>
                                    </div>
                                )
                            })}
                        </Card>}
                    <Row>
                        <Col md={6}>
                            <Form.Label>Add Scheme to Segment:</Form.Label>
                            <Select name="schemaName"
                                options={availableOptions()}
                                onChange={(option) => {
                                    if (option !== null) {
                                        setSelectedOption(option)
                                    } else {
                                        setSelectedOption("")
                                    }
                                }}
                                getOptionLabel={option => option.label}
                                getOptionValue={option => option.value}
                                value={selectedOption}
                            /></Col>
                    </Row>
                    <a href="#" onClick={(e) => { e.preventDefault(); addNewSchema() }} style={{ color: 'green' }}>+ Add new schema</a>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-success" onClick={() => saveSegment()}>Save segment</Button>
                    <Button className="btn btn-secondary" onClick={() => closeModal()}>Close</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
export default AddSchemas