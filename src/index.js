import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import GalleryApp from './components/GalleryApp';
import $ from 'jquery';

// Render the main component into the dom
ReactDOM.render(<GalleryApp />, $('#content')[0]);
