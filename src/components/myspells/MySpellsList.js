import React, { Component } from "react"
// what components do I need? In this list component I need to render the cards and fetch the data
import MySpellsCard from "./MySpellsCard"
import SpellBookManager from "../../modules/SpellBookManager"
import Deepai from "deepai" // correct import??


class MySpellsList extends Component {

    state = {
        mySpells: [],
    };

    componentDidMount() {
        SpellBookManager.getAllMySpells().then(mySpells => {
            this.setState({
                mySpells: mySpells
            });
        });
    }

    deleteMySpell = id => {
        SpellBookManager.deleteMySpell(id)
            .then(() => {
                SpellBookManager.getAllMySpells()
                    .then((newMySpells) => {
                        this.setState({
                            mySpells: newMySpells
                        })
                    })
            })
    }

    editAddNotesButton = (obj, id) => {
        return SpellBookManager.editMySpellToAddNote(obj, id).then(() => {
            SpellBookManager.getAllMySpells().then(mySpells => {
                this.setState({
                    mySpells: mySpells
                });
            });
        });
    };


    //   Here is where I am messing around with the Deepai external API image comparison
    // deepai = require('deepai');
    // deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K'); //maybe I set this in the manager?

    // an async function returns a promise. the values are wrapped in a resolved promise
    // async function() {
    //     const resp = await deepai.callStandardApi("image-similarity", {
    //         image1: "YOUR_IMAGE_URL", // this.state.mySpell.image ???
    //         image2: "YOUR_IMAGE_URL", // this.state.spells.image ???
    //     });
    //     console.log(resp);
    // };



    render() {
        console.log("SPELL LIST: Render");

        return (
            <React.Fragment>
                <div className="container__mySpells-cards">
                    {this.state.mySpells.map(mySpell => (
                        <MySpellsCard
                            key={mySpell.id}
                            mySpell={mySpell}
                            deleteMySpell={this.deleteMySpell}
                            editAddNotesButton={this.editAddNotesButton}
                            {...this.props}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default MySpellsList