export const SERVER_PORT = 5000; 

export const WARNING_LEVEL_COLORS = {
    1: 'green',
    2: 'yellow',
    3: 'orange',
    4: 'red',
    default: 'grey',
  };

  export const DEFAULT_GRADIENT = 'grey';

  export const DOUBLE_WARNING_LEVEL = "blueviolet"


export const legendData = [
    { level: 1, color: WARNING_LEVEL_COLORS[1], label: "Safe" },
    { level: 2, color: WARNING_LEVEL_COLORS[2], label: "Moderate (Stay Alert)" },
    { level: 3, color: WARNING_LEVEL_COLORS[3], label: "Danger" },
    { level: 4, color: WARNING_LEVEL_COLORS[4], label: "Immediate Danger" },
    { level: 5, color: DOUBLE_WARNING_LEVEL, label: 'Multiple Warning Levels' },
    { level: 6, color: '#5a5a5a', label: 'No Information Found' },
  ];