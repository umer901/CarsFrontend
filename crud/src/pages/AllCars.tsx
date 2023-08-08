import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteCar, fetchALLCars,getAllCars,getLoading,} from "../features/cars/carslice";
import { Button, Container } from "react-bootstrap";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

const AllCars = () => {
  const allCars = useSelector(getAllCars);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  let contentToRender;
  const navigate = useNavigate();
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   const invokeAllCarsAPI = async () => {
  //     dispatch(allCarsLoading());
  //     await axios.get("http://localhost:4000/cars").then((response) => {
  //       dispatch(allCarsRecieved(response.data));
  //     });
  //   };
  //   invokeAllCarsAPI();
  // }, [dispatch]);

  useEffect(() => {
      dispatch(fetchALLCars());
  }, [dispatch]);

  const openDeleteModalHandler = (id:any) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };
 
  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };
 
  const confirmDeleteModalHandler = () => {
    dispatch(deleteCar(itemToDeleteId))
      .unwrap()
      .then(() => {
        setShowModal(false);
        setItemToDeleteId(0);
      });
  };

  contentToRender =
    apiStatus === "pending" ? ( //if API status is pending then load this component
      <>
        <div className=" d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    ) : (
      <>
        <Row className="g-4">
          {allCars.map((car:any) => (
            <Col key={car.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>{car.model}</Card.Text>
                  <Button
                  variant="dark"
                  type="button"
                  onClick={() => {
                  navigate(`/edit-car/${car.id}`);}}>
                  Edit Info
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                      openDeleteModalHandler(car.id);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
    
  return (
    <>
    <DeleteConfirmation
    title="Delete Confirmation!"
    body="Are sure to delete this item"
    showModal={showModal}
    apiStatus={apiStatus}
    hideDeleteModalHandler={hideDeleteModalHandler}
    confirmDeleteModalHandler={confirmDeleteModalHandler}
    ></DeleteConfirmation>
    
    <Container className="mt-2">
    <Row>
      <Col className="col-md-4 offset-md-4">
        <Button variant="dark"  type="button" onClick={() => {navigate("/add-car")}}>Add New Car</Button>
      </Col>
    </Row>
    <Row>{contentToRender}</Row>
  </Container>
</>)
};
 
export default AllCars;