const remoteURL = "http://localhost:3001";

export default {
    getAllSpells() {
        return fetch(`${remoteURL}/spells`).then(result =>
            result.json()
        );
    },
    getSpell(id) {
        console.log("hi")
        console.log(`${remoteURL}/spells/${id}`)
        return fetch(`${remoteURL}/spells/${id}`).then(result =>
            result.json()
        );
    },


};
