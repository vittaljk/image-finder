import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ImageFinder from './ImageFinder';

test('renders images fetched from API', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({
      collection: {
        items: [
          {
            links: [
              {
                render: 'image',
                href: 'https://images-assets.nasa.gov/video/NHQ_2019_0311_Go Forward to the Moon/NHQ_2019_0311_Go Forward to the Moon~thumb.jpg"'
              },
              {
                render: 'image',
                href: 'https://images-assets.nasa.gov/video/NHQ_2019_0312_Go Forward to the Moon/NHQ_2019_0311_Go Forward to the Moon~thumb.jpg"'
              }
            ]
          }
        ]
      }
    })
  });

  render(<ImageFinder />);

  await waitFor(() => {
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2); // Two images should be rendered
  });
});

test('handles empty API response', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({
      collection: {
        items: []
      }
    })
  });

  render(<ImageFinder />);

  const noImagesMessage = await screen.findByText(/no images found/i);
  expect(noImagesMessage).toBeInTheDocument();
});
