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
    postCanvasSpell(newSpell) {
        return fetch(`${remoteURL}/mySpells`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSpell)
        }).then(data => data.json())
    }


};
