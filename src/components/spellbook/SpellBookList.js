import React, { Component } from "react"
// what components do I need? In this list component I need to render the cards and fetch the data
import SpellBookCard from "./SpellBookCard"
import SpellBookManager from "../../modules/SpellBookManager"
import SpellBookCarousel from "./SpellBookCarousel";

class SpellBookList extends Component {

    state = {
        spells: [],
    };

    componentDidMount() {
        SpellBookManager.getAllSpells().then(spells => {
            this.setState({
                spells: spells
            });
        });
    }

    render() {
        console.log("SPELL LIST: Render");

        return (
            <React.Fragment>
                <div className="container__spellbook-cards">

                    <SpellBookCarousel
                        spells={this.state.spells}
                        {...this.props}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default SpellBookList