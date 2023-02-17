import React from 'react';
import styled from 'styled-components';

import Carousel from '../Carousel/Carousel';
import config from '../../config';

const {
  largeDesktopWidth,
  extraLargeDesktopWidth,
} = config.breakpoint.hostBreakpoints;

const StyledPregameWelcomeText = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4px;
  right: 4px;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary-background-color);
  padding: 8px 42px 8px 8px;
  border-radius: 5px;
  font-size: 1.8rem;
  font-weight: 700;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  h2 {
    line-height: 2.4rem;
    font-size: 2rem;
  }

  h3 {
    font-size: 1.2rem;
    line-height: 1.2rem;
  }

  p {
    margin: 8px;
    font-size: 1.1rem;
  }

  ol {
    margin: 8px;
    line-height: 1.3rem;
  }

  li {
    margin: 0;
    font-size: 1rem;
    line-height: 1.3rem;
  }

  .howToWin {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px 0;
  }

  .snarkyText {
    font-size: 0.6rem;
    margin: 0 2px;
    padding: 0;
  }

  @media (min-width: 1100px) {
    left: 8px;
    right: 8px;
    align-self: center;
    ol,
    li {
      line-height: 1.7rem;
    }
  }

  @media (min-width: ${largeDesktopWidth}) {
    h2 {
      font-size: 3.2rem;
      line-height: 3.2rem;
    }

    h3 {
      font-size: 2.5rem;
      line-height: 2.3rem;
    }

    p {
      margin: 14px;
    }

    p,
    li {
      font-size: 1.7rem;
    }

    ol,
    li {
      line-height: 2rem;
      margin: 12px;
    }

    .snarkyText {
      font-size: 1rem;
      margin: 0 4px;
      padding: 0;
    }
  }

  @media (min-width: ${extraLargeDesktopWidth}) {
    h2 {
      font-size: 4rem;
      line-height: 4.4rem;
    }

    h3 {
      font-size: 3rem;
      line-height: 3rem;
    }

    p {
      margin: 20px;
      font-size: 2rem;
    }

    ol {
      margin: 40px;
    }

    li {
      margin: 10px;
      font-size: 2rem;
    }

    .howToWin {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 20px 0;
    }

    .snarkyText {
      font-size: 1.5rem;
      margin: 0;
      padding: 0;
    }
  }
`;

function Welcome() {
  return (
    <>
      <h2>Welcome! ¡Bienvenidos! Добро пожаловать!</h2>
      <p>Cards of Carousal is your grandma&apos;s favorite online card game!</p>
      <p>
        Imagine if your indecency and crude taste in jokes was an advantage in
        life. It isn&apos;t, but in Cards of Carousal it can be!
      </p>
      <p>
        Long and short of this deal; one person (the Czar of the round) reads
        the black card on this screen. Everyone else submits a white card trying
        to be the Czar&apos;s favorite jester. More directions on the following
        pages if you&apos;re still confused.
      </p>
    </>
  );
}

function Setup() {
  return (
    <>
      <h2>How to play:</h2>
      <ol>
        <li>
          All players get on a voice chat together / gather around a tv with a
          web browser if in person (as if you have real life friends)
        </li>
        <li>
          One player streams this screen to all the others / has this on the
          shared screen
        </li>
        <li>
          All players go to cardsofcarousal.com in a web browser, hit the join
          button, and input the &quot;JOIN CODE&quot; shown in the bottom left
          of this screen
        </li>
        <li>
          The host selects the card packs to play with, what the winning score
          should be, and sets a max player limit (if desired)
        </li>
        <li>
          Once ready to start, the host clicks the &quot;START CAROUSING&quot;
          button on this screen
        </li>
      </ol>
    </>
  );
}

function Rules1() {
  return (
    <>
      <h2>Rules:</h2>
      <p className="snarkyText">
        (if you want to follow them, I&apos;m not your dad)
      </p>
      <ol>
        <li>
          Each round 1 player is selected as the Czar, and the other players
          will be jesters
        </li>
        <li>
          A black card with a sentence will appear on this screen. You might
          think &quot;how could this card be funny&quot; but that&apos;s just
          because you have no sense of humor
        </li>
        <li>
          Jesters will each receive a hand of white cards with a unique
          word/phrase. See above with regards to cards you don&apos;t think are
          funny
        </li>
        <li>The Czar reads the text on the black card out loud</li>
        <li>
          Jesters submit a number of their white cards equal to the &quot;PICK
          X&quot; number on the bottom right of the black card
        </li>
      </ol>
    </>
  );
}

function Rules2() {
  return (
    <>
      <h2>Rules 2 - Eccentric Caribou: </h2>
      <ol start="6">
        <li>
          The Czar reads each submission out loud, in the context of the black
          card... yes every time Janet
        </li>
        <li>
          The Czar picks their favorite submission, the winning jester gets one
          point
        </li>
        <li>
          A different player becomes Czar and a new round starts. Just think of
          it like you&apos;re in imperial Russia. TIP: if you start losing claim
          a communist revolution and give everyone equal points. Except for you
          of course, as the leader of the revolution you deserve more
        </li>
        <div className="howToWin">
          <h3>The first player to reach the winning score wins!</h3>
          <p className="snarkyText">(duh)</p>
        </div>
      </ol>
    </>
  );
}

export default function PregameWelcomeText() {
  return (
    <StyledPregameWelcomeText>
      <Carousel
        slides={[<Welcome />, <Setup />, <Rules1 />, <Rules2 />]}
        interval={config.carouselRotationInterval}
      />
    </StyledPregameWelcomeText>
  );
}
