import { connect } from "react-redux";
import { TopPanel } from ".";
import { changeSmileState, resetGame } from "../../redux/actions/game";
import { getCurrentMinesCount, getGameState, getSmileState, getTimerActive } from "../../redux/selectors";

const mapStateToProps = (state) => {
    return {
        timerActive: getTimerActive(state),
        currentMinesCount: getCurrentMinesCount(state),
        smileState: getSmileState(state),
        gameState: getGameState(state)
    };
};

export const TopPanelContainer = connect(mapStateToProps, {
    changeSmileState,
    resetGame
})(TopPanel);