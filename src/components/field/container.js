import { connect } from "react-redux";
import Field from "."
import { getEmptyField, getField, getGameState } from "../../redux/field-selectors"
import { changeGameState, createEmptyField, fillField, markMinesNearby, openCell } from "../../redux/fieldReducer";

const mapStateToProps = (state) => {
    return {
        field: getField(state),
        emptyField: getEmptyField(state),
        gameState: getGameState(state)
    }
}

const FieldContainer = connect(mapStateToProps,
    { createEmptyField, openCell, changeGameState, fillField, markMinesNearby })(Field);

export default FieldContainer;