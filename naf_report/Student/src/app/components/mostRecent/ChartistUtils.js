import Chartist from 'chartist';

function ctPointLabels(options) {
  return function ctPointLabels(chart) {
    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -10
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);


      chart.on('draw', function(data) {
        if(data.type === 'bar') {
          console.log("BABABABABABBABABA");
          console.log(data.value);
          if(data.value.x < 50) {
            data.element.attr({
              style: 'stroke: #c14a41'
            });
          }
          else {
            data.element.attr({
              style: 'stroke: #27c24c'
            });
          }

        }
        else if(data.type === 'point') {
          data.group.elem('text', {
            x: data.x + options.labelOffset.x,
            y: data.y + options.labelOffset.y,
            style: 'text-anchor: ' + options.textAnchor
          }, options.labelClass).text(data.value.y);
        }
      });

  }
}

export default ctPointLabels;
