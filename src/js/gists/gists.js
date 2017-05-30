import '../../scss/main/main.scss';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Content from '../components/Content.jsx';


function start() {
  ReactDOM.render(
    <Content url={`https://api.github.com/gists${window.location.pathname}`} details={true}/>,
    document.getElementById('gists-container')
  );
}//end start


$(document).ready(start)
