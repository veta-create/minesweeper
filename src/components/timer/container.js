import { connect } from "react-redux";
import Timer from ".";
import { getTimerActive } from "../../redux/topPanel-selectors";

const mapStateToProps = (state) => {
    return {
        timerActive: getTimerActive(state),
    }
}

const TimerContainer = connect(mapStateToProps, {})(Timer);

export default TimerContainer;