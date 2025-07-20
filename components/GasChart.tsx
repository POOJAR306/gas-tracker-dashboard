// components/GasChart.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import { createChart, CandlestickData } from 'lightweight-charts';

type Props = {
  data: CandlestickData[];
};

export default function GasChart({ data }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const series = chart.addCandlestickSeries();
    series.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
}
