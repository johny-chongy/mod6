import { Link } from 'react-router-dom';

/** component that renders home page
 *
 * App --> Home --> Setup
 */
function Home() {
    return (
        <div className="Home">
            <h1>MOD 6</h1>
            <h3>Rules</h3>
            <button>
                <Link to={'/settings'} >Get Started </Link>
            </button>
        </div>
    )
}

export default Home;