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
    static async getNewShuffledDeckId() {
        const response = await this.request(`new/shuffle`);
        CardApi.deckId = response.deck_id;
        return CardApi.deckId;
    }

    /** Draw a card */
    static async drawCard(deckId: string) {
        try {
            const response = await this.request(`${deckId}/draw`);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
}

export default CardApi;