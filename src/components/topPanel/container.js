import { connect } from "react-redux";
import TopPanel from ".";
import { getGameState } from "../../redux/field-selectors";
import { getCurrentMinesCount, getSmileState } from "../../redux/topPanel-selectors";
import { changeCurrentMinesCount, changeSmileState } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        currentMinesCount: getCurrentMinesCount(state),
        smileState: getSmileState(state),
        gameState: getGameState(state)
    };
};

const TopPanelContainer = connect(mapStateToProps, { changeCurrentMinesCount, changeSmileState })(TopPanel);

export default TopPanelContainer;