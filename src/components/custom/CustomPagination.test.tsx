import { CustomPagination } from "@/components/custom/CustomPagination";
import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";

vi.mock('../ui/button', () => ({
  Button: ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement => (
    <button {...props}> {children} </button>
  )
}))

const renderWithRouter = ( component: React.ReactElement, initialEntries?: string[] ) => {
  return render (
    <MemoryRouter initialEntries={initialEntries}> {component} </MemoryRouter>
  )
}

describe('CustomPagination', () => {

  test('should render the component with default values', () => {
    renderWithRouter(<CustomPagination totalPages={5} />)

    // screen.debug();
    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();

    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('4')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });


  test('should disabled previous button when page is 1', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    const previousButton = screen.getByText('Previous');
    // screen.debug(previousButton);

    expect(previousButton.getAttributeNames()).toContain('disabled');
  });

  test('should disabled next button whe we are in the last page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);
    const nextButton = screen.getByText('Next');
    // screen.debug(nextButton);

    expect(nextButton.getAttributeNames()).toContain('disabled');
  })


  test('should disabled button 3 whe we are in page 3', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);
    const button3 = screen.getByText('3');
    const button2 = screen.getByText('2');
    // screen.debug(button2);
    // screen.debug(button3);

    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');
  });


  test('should change page when click on the number button', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);
    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');
    // screen.debug(button2);

    fireEvent.click(button2);
    // screen.debug(button2);


    expect(button2.getAttribute('variant')).toBe('default');
    expect(button3.getAttribute('variant')).toBe('outline');
  });
})