import { connect } from "react-redux";
import TopPanel from ".";
import { getCurrentMinesCount } from "../../redux/topPanel-selectors";
import { changeCurrentMinesCount } from "../../redux/topPanelReducer";

const mapStateToProps = (state) => {
    return {
        currentMinesCount: getCurrentMinesCount(state)
    };
};

const TopPanelContainer = connect(mapStateToProps, { changeCurrentMinesCount })(TopPanel);

export default TopPanelContainer;