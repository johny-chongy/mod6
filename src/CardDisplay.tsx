import Image from 'react-bootstrap/Image';

/** CardDisplay renders the card given card info
 *
 * Props:
 *  -card: card info from drawing from a deck
*/

interface CardDisplayProps {
    'image': string
}

function CardDisplay({ image }: CardDisplayProps) {
    return (
        <div className="CardDisplay">
            <Image src={image} />
        </div>
    )
}

export default CardDisplay;