import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

/** component that renders home page
 *
 * App --> Home --> Setup
 */
function Home() {
    return (
        <div className="Home">
            <h1>MOD 6</h1>
            <h3>Rules</h3>
            <Button variant='success'>
                <Link
                    to={'/settings'}
                    style={{ textDecoration: 'none'}}
                    className='text-light'
                >
                    Get Started
                </Link>
            </Button>
        </div>
    )
}

export default Home;