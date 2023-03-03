import { connect } from "react-redux";
import TopPanel from ".";
import { getGameState } from "../../redux/field-selectors";
import { changeGameState, createEmptyField } from "../../redux/fieldReducer";
import { getCurrentMinesCount, getSmileState } from "../../redux/topPanel-selectors";
import { changeCurrentMinesCount, changeSmileState } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        currentMinesCount: getCurrentMinesCount(state),
        smileState: getSmileState(state),
        gameState: getGameState(state)
    };
};

const TopPanelContainer = connect(mapStateToProps, {
    changeCurrentMinesCount,
    changeSmileState,
    createEmptyField,
    changeGameState
})(TopPanel);

export default TopPanelContainer;