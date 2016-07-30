import blog from './apis/blog';
import twitter from './apis/twitter';
import photography from './apis/photography';
import pocket from './apis/pocket';
import instagram from './apis/instagram';
import github from './apis/github';
import soundcloud from './apis/soundcloud';
import youtube from './apis/youtube';
import React from 'react';
import {renderToString} from 'react-dom/server'
import GridComponent from '../assets/javascripts/components/GridComponent';

let store = false;
let savedHTML = '';
let timeStamp = Date.now();

export default function fetchStore() {
  let promises = [];
  promises.push(blog().then(x => store.blog = x));
  promises.push(twitter().then(x => store.twitter = x));
  promises.push(photography().then(x => store.photography = x));
  promises.push(pocket().then(x => store.pocket = x));
  promises.push(instagram().then(x => store.instagram = x));
  promises.push(github().then(x => store.github = x));
  promises.push(soundcloud().then(x => store.soundcloud = x));
  promises.push(youtube().then(x => store.youtube = x));
  return new Promise((resolve, reject) => {
    let anHourSinceLastFetch = Date.now() > timeStamp + ( 60 * 60 * 1000);
    if (anHourSinceLastFetch || !store || !savedHTML) {
      store = {};
      Promise.all(promises)
      .then(x => {
        let Component = (<GridComponent blog={store.blog} twitter={store.twitter}
                          photography={store.photography} pocket={store.pocket}
                          instagram={store.instagram} github={store.github}
                          soundcloud={store.soundcloud} youtube={store.youtube} />)
        savedHTML = renderToString(Component)
      })
      .then(x=> resolve({renderedHTML:savedHTML, assets: store}))
      .catch(reject);
    } else {
      resolve({renderedHTML: saved_html, assets: store});
    }
  });
}
