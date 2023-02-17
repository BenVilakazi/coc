import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import HostLayout from '../../layouts/HostLayout';
import { HostContext } from '../../contexts/HostContext/HostContext';
import PlayerList from '../../components/PlayerList/PlayerList';
import InGameSettingsModal from '../../components/HostSettingsMenu/InGameSettingsModal.js';
import JoinCode from '../../components/JoinCode/JoinCode';
import BlackCard from '../../components/Cards/BlackCard';
import WhiteCard from '../../components/Cards/WhiteCard';

const LeftPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .player-list-wrapper {
    overflow-x: auto;
    flex-grow: 1;
  }

  .buttons-wrapper {
    display: block;
    margin-bottom: 20px;
  }

  .bottom-left-wrapper {
    margin: 20px auto 32px;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .join-code-wrapper {
    display: flex;
    justify-content: center;
  }

  .host-pregame-button {
    padding: 0;
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    margin: auto auto 12px;
  }
`;

const RightPanelWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  .winner-display {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    line-height: 1em;

    font-size: 56px;
    font-weight: 900;
    text-transform: uppercase;

    span {
      font-size: 24px;
      text-indent: -20px;
      margin-bottom: -8px;
      line-height: 1.5rem;
    }
  }
`;

const WhiteCardWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, auto)`};
  gap: 20px;
  place-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
  max-height: 250px;
`;

function LeftPanel() {
  const { state } = useContext(HostContext);
  const { lobbyID } = state;

  return (
    <LeftPanelWrapper>
      <div className="player-list-wrapper">
        <PlayerList />
      </div>
      <div className="bottom-left-wrapper">
        <div className="join-code-wrapper">
          <JoinCode code={lobbyID} />
        </div>
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  const { state } = useContext(HostContext);

  const { selectedBlackCard, players, czarSelection } = state;

  const winner = players[czarSelection];

  return (
    <RightPanelWrapper columns={winner.submittedCards.length}>
      <h1 className="winner-display" data-testid="winner-display">
        <span>WINNER:</span>
        {winner.name.toUpperCase()}
      </h1>

      <BlackCard
        pickCount={selectedBlackCard.pick}
        data-test-id="black-card"
        winnerScreen
      >
        {selectedBlackCard.text}
      </BlackCard>

      <WhiteCardWrapper columns={winner.submittedCards.length}>
        {winner.submittedCards.map((card) => (
          <WhiteCard key={card}>
            {/* When round changes, the card may become undefined temporarily resulting in an error */}
            {winner.cards[card] && winner.cards[card].text}
          </WhiteCard>
        ))}
      </WhiteCardWrapper>
    </RightPanelWrapper>
  );
}

function startNextRound(dispatch) {
  dispatch({ type: 'ADD_PLAYERS_FROM_STAGING', payload: {} });

  dispatch({ type: 'REMOVE_SUBMITTED_CARDS_FROM_PLAYER', payload: {} });

  dispatch({ type: 'SET_NEXT_CZAR', payload: {} });

  dispatch({ type: 'SELECT_BLACK_CARD', payload: {} });

  dispatch({ type: 'DEAL_WHITE_CARDS', payload: {} });
}

function endGame(dispatch, payload) {
  dispatch({ type: 'GAME_OVER', payload });
}

function HostRoundWinnerScreen() {
  const { state, dispatch } = useContext(HostContext);
  const { winnerScreenDisplayTime, winningScore } = state.gameSettings;
  const { players, playerIDs, czarSelection } = state;

  useEffect(() => {
    const czar = playerIDs.find((id) => players[id].isCzar);
    const losers = playerIDs.filter(
      (playerID) => !players[playerID].isCzar && playerID !== czarSelection,
    );

    dispatch({
      type: 'SEND_END_OF_ROUND_MESSAGES',
      payload: {
        winnerName: players[czarSelection].name,
        winnerId: czarSelection,
        losers,
        czar,
      },
    });

    setTimeout(() => {
      if (players[czarSelection].score >= winningScore) {
        return endGame(dispatch, { gameWinner: czarSelection, playerIDs });
      }

      return startNextRound(dispatch);
    }, winnerScreenDisplayTime);
  }, []);

  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<InGameSettingsModal />}
    />
  );
}

export default HostRoundWinnerScreen;
