import React, { Component } from "react"
// import SpellBookCard from "./SpellBookCard"
import SpellBookManager from "../../modules/SpellBookManager"
import SpellBookCarousel from "./SpellBookCarousel";
import './SpellBookList.css'

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