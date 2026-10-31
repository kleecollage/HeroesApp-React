import { SearchControls } from "@/heroes/pages/search/ui/SearchControls";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";

if(typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver
}

const renderControlsWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>
  )
}

describe('SearchControls', () => {
  test('should render SearchControl with default values', () => {
    renderControlsWithRouter();
    // screen.debug();
  });

  test('should set input value when search param name is set', () => {
    renderControlsWithRouter(['/?name=batman']);
    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

    expect(input.getAttribute('value')).toBe('batman');
    // screen.debug(input);
  });

  test('should change params when input is changed and enter is pressed', () => {
    renderControlsWithRouter(['/?name=batman']);
    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

    expect(input.getAttribute('value')).toBe('batman');

    fireEvent.change(input, {target: {value: 'superman'}})
    fireEvent.keyDown(input, {key: 'Enter'})

    expect(input.getAttribute('value')).toBe('superman');
    // screen.debug(input);
  });

  test('should change params strength when slider changes', () => {
    renderControlsWithRouter(['/?name=batman&active-accordion=advance-filters']);
    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, {key: 'ArrowRight'});
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
    // screen.debug(slider)
  });


  test('should accordin be open when active-accordion param is set', () => {
    renderControlsWithRouter(['/?name=batman&active-accordion=advance-filters']);
    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
    // screen.debug(accordion);
  })


  test('should accordin be closed when active-accordion param is not set', () => {
    renderControlsWithRouter(['/?name=batman']);
    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    // screen.debug(accordion);
  })
})