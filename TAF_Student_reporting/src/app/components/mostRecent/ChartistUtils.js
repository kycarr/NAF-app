import Chartist from 'chartist';

function ctPointLabels(options) {
  return function ctPointLabels(chart) {
    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: 20
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);


      chart.on('draw', function(data) {
      
        if(data.type === 'bar') {
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
