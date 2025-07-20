// components/GasChart.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import createChart from 'lightweight-charts';

type CandlestickData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
type Props = {
  data: CandlestickData[];
};

export default function GasChart({ data }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current!;
    container.style.width = '100%';
    container.style.height = '300px';

    const chart = createChart(container);
    chart.resize(container.clientWidth, container.clientHeight);


    const series = chart.addCandlestickSeries();
    series.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
}
