import { connect } from "react-redux";
import Field from "."
import { getEmptyField, getField } from "../../redux/field-selectors"
import { createEmptyField } from "../../redux/fieldReducer";

const mapStateToProps = (state) => {
    return {
        field: getField(state),
        emptyField: getEmptyField(state)
    }
}

const FieldContainer = connect(mapStateToProps, { createEmptyField })(Field);

export default FieldContainer;