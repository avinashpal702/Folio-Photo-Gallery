# Folio Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS. Browse a curated set of 30 photographs, search by photographer, and save favourites in your browser.

## Features

- Displays 30 photographs from the [Picsum Photos](https://picsum.photos/) API.
- Shows six photographs under each gallery name:
  - Avinash Pal
  - Shraddha Pal
  - Tom Cruise
  - Aneed Paddha
  - Farhana Bhatt
- Search the gallery by photographer name.
- Add or remove favourites; selections persist in browser local storage.
- Responsive layout with loading and error states.

## Requirements

- Node.js and npm
- Internet access to load the photo list and images from Picsum Photos

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
  components/
    Gallery.jsx       Gallery layout, search, and photographer assignments
    PhotoCard.jsx     Individual photograph and favourite control
  hooks/
    useFetchPhotos.js Loads photographs from Picsum Photos
  reducers/
    favouritesReducer.js  Adds or removes favourite photo IDs
  app.jsx
  index.css
  main.jsx
```

## Data and persistence

The gallery loads its photo list from `https://picsum.photos/v2/list?limit=30`. Photographer names are assigned to the images in groups of six in the order they appear in the API response. Favourites are stored in the browser's `localStorage` under the `favourites` key.
