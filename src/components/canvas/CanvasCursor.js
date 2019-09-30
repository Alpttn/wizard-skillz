import React from 'react';

/* Mouse trail adapted from a jQuery Codepen by Bryan C https://codepen.io/bryjch/pen/QEoXwA */

//not using this component at the moment. This holds the cool cursor tail that won't work at the moment. 

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
  }
}

class CanvasCursor extends React.Component {
  state = {
    cHeight: 0,
    cWidth: 0,
  };

  canvas = React.createRef();

  componentDidMount = () => {
    // Set height and width on load because if set in state body isn't defined yet.
    // this.setState({
    //   cHeight: document.body.clientHeight,
    //   cWidth: document.body.clientWidth,
    // });
    // where I want to draw the shapes
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    // ctx.fillRect(195, 50, 10, 10);
    // const squareTwo =ctx.fillRect(50, 300, 10, 10);
    // const squareThree =ctx.fillRect(340, 300, 10, 10);

    // window.addEventListener(
    //   'resize',
    //   () => {
    //     this.setState({
    //       cHeight: document.body.clientHeight,
    //       cWidth: document.body.clientWidth,
    //     });
    //   },
    //   false,
    // );

    // If the device supports cursors, start animation.
    if (matchMedia('(pointer:fine)').matches) {
      this.startAnimation();
    };
  }

  startAnimation = () => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');

    const points = [];

    const addPoint = (x, y) => {
      const point = new Point(x, y);
      points.push(point);
    };

    document.addEventListener('mousemove', ({ clientX, clientY }) => {
      addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    }, false);

    const animatePoints = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const duration = 0.7 * (1 * 1000) / 60; // Last 80% of a frame per point

      for (let i = 0; i < points.length; ++i) {
        const point = points[i];
        let lastPoint;

        if (points[i - 1] !== undefined) {
          lastPoint = points[i - 1];
        } else lastPoint = point;

        point.lifetime += 1;

        if (point.lifetime > duration) {
          // If the point dies, remove it.
          points.shift();
        } else {
          // Otherwise animate it:

          // As the lifetime goes on, lifePercent goes from 0 to 1.
          const lifePercent = (point.lifetime / duration);
          const spreadRate = 7 * (1 - lifePercent);

          ctx.lineJoin = 'round';
          ctx.lineWidth = spreadRate;

          // As time increases decrease r and b, increase g to go from purple to green.
          const red = Math.floor(190 - (190 * lifePercent));
          const green = 0;
          const blue = Math.floor(210 + (210 * lifePercent));
          ctx.strokeStyle = `rgb(${red},${green},${blue}`;

          ctx.beginPath();

          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(point.x, point.y);

          ctx.stroke();
          ctx.closePath();
        }
      }
      requestAnimationFrame(animatePoints);
    };

    animatePoints();
  }

  render = () => {
    // const { cHeight, cWidth } = this.state;
    return <canvas className="canvasCursor" ref={this.canvas} width="700" height="400" />;
  }
}

export default CanvasCursor;