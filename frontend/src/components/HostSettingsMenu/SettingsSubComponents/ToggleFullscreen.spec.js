import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import ToggleFullscreen from './ToggleFullscreen';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import requestFullscreen from '../../../helpers/requestFullscreen';

jest.mock('../../../helpers/requestFullscreen');

// mock the OptionButton component that is imported into ToggleFullscreen
jest.mock(
  './OptionButton', // eslint-disable-next-line react/prop-types
  () => ({ isEnabled, onEnabledClick, onDisabledClick, children }) => {
    function clickHandler() {
      if (isEnabled) {
        onEnabledClick();
      } else {
        onDisabledClick();
      }
    }

    return (
      <button
        type="button"
        data-testid="option-button"
        data-is-enabled={isEnabled}
        onClick={clickHandler}
      >
        {children}
      </button>
    );
  },
);

describe('ToggleFullscreen', () => {
  describe('rendering', () => {
    it('matches the snapshot', () => {
      const state = {};

      const dispatch = jest.fn();

      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders', () => {
      const state = {};
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(screen.getByText('TOGGLE FULLSCREEN')).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('passes the isEnabled prop through when false', () => {
      const state = {};
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled={false} onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'TOGGLE FULLSCREEN',
      });

      expect(optionButton.dataset.isEnabled).toBe('false');
    });

    it('passes the isEnabled prop through when true', () => {
      const state = {};
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'TOGGLE FULLSCREEN',
      });

      expect(optionButton.dataset.isEnabled).toBe('true');
    });

    it('does not dispatch an action when the button is not clicked', () => {
      const state = {};
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('requests fullscreen when button is enabled and clicked, and the screen is not already maximized', () => {
      const state = {};
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      userEvent.click(
        screen.getByRole('button', { name: 'TOGGLE FULLSCREEN' }),
      );

      expect(requestFullscreen).toHaveBeenCalledTimes(1);
    });

    it('exits fullscreen when button is enabled and clicked, and the screen is already maximized', () => {
      const state = {};
      const dispatch = jest.fn();

      const { fullscreenElement, exitFullscreen } = document;

      document.exitFullscreen = jest.fn();
      document.fullscreenElement = true;

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      userEvent.click(
        screen.getByRole('button', { name: 'TOGGLE FULLSCREEN' }),
      );

      expect(requestFullscreen).not.toHaveBeenCalled();
      expect(document.exitFullscreen).toHaveBeenCalledTimes(1);

      // restore mocked browser document method
      document.exitFullscreen = exitFullscreen;
      document.fullscreenElement = fullscreenElement;
    });

    it('does not call the onDisabledClick callback when disabled but not clicked', () => {
      const state = {};
      const dispatch = jest.fn();
      const mockOnDisabledClick = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
          ,
        </HostContext.Provider>,
      );

      expect(mockOnDisabledClick).not.toHaveBeenCalled();
    });

    it('calls the onDisabledClick callback when disabled and clicked', () => {
      const state = {};
      const dispatch = jest.fn();
      const mockOnDisabledClick = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
          ,
        </HostContext.Provider>,
      );

      userEvent.click(
        screen.getByRole('button', { name: 'TOGGLE FULLSCREEN' }),
      );

      expect(mockOnDisabledClick).toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled Prop', () => {
      const state = {};
      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      userEvent.click(screen.getByTestId('option-button'));

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isEnabled Prop as a non bool', () => {
      const state = {};
      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled="foo" onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onDisabledClick Prop', () => {
      const state = {};
      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onDisabledClick Prop as a non function', () => {
      const state = {};
      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick="foo" />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when all required props are given correctly', () => {
      const state = {};
      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <ToggleFullscreen isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
