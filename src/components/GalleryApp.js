require('normalize.css/normalize.css');
require('styles/GalleryApp.scss');

import React from 'react';

// 获取图片相关的数据
var imageDatas = require('../datas/imageDatas.json');

imageDatas = (function genImageURL(imageDatasArr) {
  imageDatasArr.forEach(function(item) {
    item.imageURL = require('../images/' + item.fileName);
  });
  return imageDatasArr;
})(imageDatas);



class GalleryApp extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

GalleryApp.defaultProps = {
};

export default GalleryApp;