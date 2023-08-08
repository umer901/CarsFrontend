import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, saveNewCar } from "../features/cars/carslice";
import { useNavigate } from "react-router-dom";
 
const AddCar = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      model: "",
    },
  });
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);
 
  const createNewCar = (data:any) => {
    let payload = {
      name: data.name,
      model: data.model,
    };
    dispatch(saveNewCar(payload))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Create A New Car</legend>
            <Form onSubmit={handleSubmit(createNewCar)}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
              <Form.Group className="mb-3" > {/* controlId="formModelYear" */}
                <Form.Label>Model</Form.Label>
                <Controller
                  control={control}
                  name="model"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
              <Button variant="dark" type="submit" disabled={apiStatus === "pending"}>
                {apiStatus === "pending"? "Saving.........": "Save"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </> 
  );
};

export default AddCar;