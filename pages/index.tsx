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
      <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Chain</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Base Fee (gwei)</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Priority Fee (gwei)</th>
          </tr>
        </thead>
        <tbody>
          {['ethereum', 'polygon', 'arbitrum'].map((chain) => (
            <tr key={chain}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{chain}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {gasData[chain]?.baseFee?.toFixed(2) ?? 'Loading...'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {gasData[chain]?.priorityFee?.toFixed(2) ?? 'Loading...'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
