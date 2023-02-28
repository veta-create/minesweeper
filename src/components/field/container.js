import { connect } from "react-redux";
import Field from "."
import { getEmptyField, getField, getGameState } from "../../redux/field-selectors"
import { changeGameState, createEmptyField, fillField, markMinesNearby, openCell } from "../../redux/fieldReducer";
import { changeTimerActive } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        field: getField(state),
        emptyField: getEmptyField(state),
        gameState: getGameState(state)
    }
}

const FieldContainer = connect(mapStateToProps,
    { createEmptyField, openCell, changeGameState, fillField, markMinesNearby, changeTimerActive })(Field);

export default FieldContainer;