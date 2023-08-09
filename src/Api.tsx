import axios from 'axios';

const CARD_API = 'https://www.deckofcardsapi.com/api/deck/';

class CardApi {
    static deckId = '';

    static async request(endpoint:string, data={}, method='get') {
        console.debug('API CALL: ', endpoint, data, method);

        const url = `${CARD_API}/${endpoint}`;

        try {
            return (await axios({ url, method, data })).data;
        } catch (err) {
            console.error('API ERROR: ', err);
        }
    }

    /** Get a new shuffled deck */
    static async getNewShuffledDeck() {
        const response = await this.request(`new/shuffle`);
        this.deckId = response.deck_id;

        return response.deck_id;
    }

    /** Draw a card */
    static async drawCard() {
        const response = await this.request(`deckId/draw`);

        return response.cards;
    }
}

export default CardApi;