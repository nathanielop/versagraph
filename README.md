# Versagraph

A versatile yet compact library for creating graphs. No associated dependencies. Just a plain and simple graphing function for use with any DOM element.

# Props

### General

 type => enum(['point', 'line', 'scatter', 'bar']);

 stretchX => If set, and === false, will interpret coordinate X values as literals against the width

 stretchY => If set, and === false, will interpret coordinate Y values as literals against the height

### Labeling

 labelX => If set, will perform xMax - (props.xOffset ? xMin : 0) / gridXInterval, and label X axis with returned values

 labelY => If set, will perform yMax - (props.yOffset ? yMin : 0) / gridYInterval, and label Y axis with returned values

### Grid

 gridXInterval => If set, will divide width of graph with lines of interval N

 gridYInterval => If set, will divide height of graph with lines of interval N

 gridX => DEFAULT false, displays a grid on axis X

 gridY => DEFAULT true, displays a grid on axis X

### Click Handling

 pointClickHandler => A onClick handler provided to each point. When a point is clicked, will call pointClickHandler providing its coordinates as arguments

 lineClickHandler => A onClick handler provided to each line. When a line is clicked, will call lineClickHandler providing its coordinates pairs as arguments

### Visual Color Styling

 lineColor => Self explanatory, css color value for each line, defaults to black

 pointColor => Self explanatory, css color value for each point, defaults to black
