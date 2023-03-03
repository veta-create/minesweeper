import { connect } from "react-redux";
import Timer from ".";
import { getGameState } from "../../redux/field-selectors";
import { getTimerActive } from "../../redux/topPanel-selectors";
import { changeTimerActive } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        timerActive: getTimerActive(state),
        gameState: getGameState(state)
    }
}

const TimerContainer = connect(mapStateToProps, { changeTimerActive })(Timer);

export default TimerContainer;