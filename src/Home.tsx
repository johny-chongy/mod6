import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/** component that renders home page
 *
 * App --> Home --> Setup
 */
function Home() {
    return (
        <div className="Home">
            <h1>Mod6</h1>
            <Container className='text-start'>
                <Row>
                    <Col>
                        <h3>How to Play</h3>
                        <p>
                            <br />
                            1. Draw a card. <br />
                            2a. The other players specify a topic from the generated category. <br />
                            2b. The other players create any topic. <br />
                            3. The active player has to name a specific number of items that fit that category. <br />
                            4. Rotate players and repeat steps 2-3 until deck is empty.
                        </p>
                        <Button href='/settings' variant='outline-dark'>Mod6</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;