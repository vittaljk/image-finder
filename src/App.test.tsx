import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ImageFinder from './ImageFinder';

test('renders image finder', () => {
  render(<App />);
  const linkElement = screen.getByText(/image finder/i);
  expect(linkElement).toBeInTheDocument();
});