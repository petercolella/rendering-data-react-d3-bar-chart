import React, { useEffect, useState } from "react";
import { csv, max, scaleBand, scaleLinear } from "d3";
import useWindowDimensions from "./hooks/useWindowDimensions";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const styles = {
  pre: {
    fontSize: "2rem",
  },
};

const BarChartContainer = () => {
  const [data, setData] = useState(null);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  if (!data) {
    return <pre style={styles.pre}>Waiting for data...</pre>;
  }

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, width]);

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => (
        <rect
          key={i}
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
          fill={"black"}
        />
      ))}
    </svg>
  );
};

export default BarChartContainer;
