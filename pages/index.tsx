import { useEffect } from 'react'
import { startGasTracking } from '../utils/gasFetcher'
import { useGasStore } from '../store/useGasStore'  

export default function Home() {
  useEffect(() => {
    startGasTracking();
  }, []);

  const gasData = useGasStore((state) => state.gasData);
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>⛽ Real-Time Cross-Chain Gas Tracker</h1>
      <p>Fetching live gas prices from Ethereum, Polygon, and Arbitrum...</p>
      <pre>{JSON.stringify(gasData, null, 2)}</pre>
    </main>
  );
}
