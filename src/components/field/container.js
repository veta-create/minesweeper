import { connect } from 'react-redux';
import { Field } from '.';

import { getField, getGameState, getCurrentMinesCount } from '../../redux/selectors';

import { changeSmileState, changeTimerActive, initGame, openCell, demineClick } from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    field: getField(state),
    gameState: getGameState(state),
    currentMinesCount: getCurrentMinesCount(state),
  };
};

export const FieldContainer = connect(mapStateToProps, {
  openCell,
  initGame,
  changeTimerActive,
  demineClick,
  changeSmileState,
})(Field);
