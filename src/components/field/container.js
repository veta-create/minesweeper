import { connect } from "react-redux";
import Field from "."
import { getEmptyField, getField, getGameState } from "../../redux/field-selectors"
import { changeGameState, checkDefeat, createEmptyField, fillField, markMinesNearby, openCell, rightClick } from "../../redux/fieldReducer";
import { getCurrentMinesCount } from "../../redux/topPanel-selectors";
import { changeCurrentMinesCount, changeTimerActive } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        field: getField(state),
        emptyField: getEmptyField(state),
        gameState: getGameState(state),
        currentMinesCount: getCurrentMinesCount(state)
    }
}

const FieldContainer = connect(mapStateToProps,
    {
        createEmptyField,
        openCell,
        changeGameState,
        fillField,
        markMinesNearby,
        changeTimerActive,
        checkDefeat,
        rightClick,
        changeCurrentMinesCount
    })(Field);

export default FieldContainer;