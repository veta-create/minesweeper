import { connect } from "react-redux";
import Field from "."
import { getEmptyField, getField, getGameState } from "../../redux/field-selectors"
import { changeGameState, checkDefeat, createEmptyField, fillField, markMinesNearby, openCell, rightClick } from "../../redux/fieldReducer";
import { getCurrentMinesCount } from "../../redux/topPanel-selectors";
import { changeCurrentMinesCount, changeSmileState, changeTimerActive } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        field: getField(state),
        emptyField: getEmptyField(state),
        gameState: getGameState(state),
        currentMinesCount: getCurrentMinesCount(state)
    }
}

export const FieldContainer = connect(mapStateToProps,
    {
        createEmptyField,
        openCell,
        changeGameState,
        fillField,
        markMinesNearby,
        changeTimerActive,
        checkDefeat,
        rightClick,
        changeCurrentMinesCount,
        changeSmileState
    })(Field);