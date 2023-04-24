import React from 'react';
import backgroundImage from '../images/Home.jpg';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '1320px',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={4} className="text-center" >
            <Button variant="light" size="lg" className="w-100 mb-3" href="/students">
              Students
            </Button>
          </Col>
          <Col md={4} className="text-center">
            <Button variant="light" size="lg" className="w-100 mb-3"href="/programs">
              Programs
            </Button>
          </Col>
          <Col md={4} className="text-center">
            <Button variant="light" size="lg" className="w-100 mb-3" href="/registrations">
              Registrations
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
