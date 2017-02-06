
'use strict';

const ReactDom            = require('react-dom');
const React               = require('react');
const PostPage            = require('./components/PostPage');

ReactDom.render(
  <PostPage />,
  document.getElementById('react-mount')
);
