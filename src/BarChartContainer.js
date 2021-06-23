import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { useGetData } from "./hooks/useGetData";
import useWindowDimensions from "./hooks/useWindowDimensions";

const styles = {
  pre: {
    fontSize: "2rem",
  },
};

const BarChartContainer = () => {
  const data = useGetData();
  const { height, width } = useWindowDimensions();

  if (!data) {
    return <pre style={styles.pre}>Waiting for data...</pre>;
  }

  const margin = { top: 20, right: 20, bottom: 20, left: 200 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])
    .paddingInner(0.025);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="black" />
            <text textAnchor="middle" y={innerHeight + 3} dy="0.71em">
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((value) => (
          <text
            key={value}
            textAnchor="end"
            x={-3}
            y={yScale(value) + yScale.bandwidth() / 2}
            dy="0.32em"
          >
            {value}
          </text>
        ))}
        {data.map((d) => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
            fill={"black"}
          />
        ))}
      </g>
    </svg>
  );
};

export default BarChartContainer;
