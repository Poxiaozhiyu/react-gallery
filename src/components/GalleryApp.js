require('normalize.css/normalize.css');
require('styles/GalleryApp.scss');

import React from 'react';

// 获取图片相关的数据
var imageDatas = require('../datas/imageDatas.json');

// 插入图片链接
imageDatas = (function genImageURL(imageDatasArr) {
  imageDatasArr.forEach(function(item) {
    item.imageURL = require('../images/' + item.fileName);
  });
  return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img width="240" height="240" src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}


class GalleryApp extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      imgsArrangeArr: [
        // pos: {
        //   left: '0',
        //   top: '0'
        // },
        // rotate: 0,    // 旋转角度
        // isInverse: false,    // 图片正反面
        // isCenter: false,    // 图片是否居中
      ]
    };
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {    // 水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {    // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };
  }

  // 图片加载后，为每张图片计算其位置的范围
  componentDidMount() {
    // 首先拿到舞台的大小
    var stageW = this.refs['stage'].scrollWidth,
        stageH = this.refs['stage'].scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    var imgW = this.refs['imgFigure0'].scrollWidth,
        imgH = this.refs['imgFigure0'].scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearRange(0);
  }

  /*
    * 重新布局所有图片
    * @param centerIndex 指定居中排布哪个图片
    */
  rearRange(centerIndex) {

  }

  render() {
    var controllerUnits = [],
        imgFigures = [];
    var _this = this;
    imageDatas.forEach(function(item, index) {
      if (!_this.state.imgsArrangeArr[index]) {
        _this.state.imgsArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,    // 旋转角度
          isInverse: false,    // 图片正反面
          isCenter: false,    // 图片是否居中
        };
      }
      imgFigures.push(<ImgFigure key={index} data={item} ref={'imgFigure' + index}/>)
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

GalleryApp.defaultProps = {
};

export default GalleryApp;