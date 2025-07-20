import { useEffect } from 'react'
import { startGasTracking } from '../utils/gasFetcher'
import { useGasStore } from '../store/useGasStore'  
import { fetchEthPrice } from '../utils/uniswapPriceFetcher'


export default function Home() {
  const usd = useGasStore((state) => state.usdPrice)
  useEffect(() => {
    startGasTracking()
    fetchEthPrice()

  const interval = setInterval(() => {
    fetchEthPrice()
  }, 15000) // fetch every 15 sec

  return () => clearInterval(interval)
  }, []);

  const gasData = useGasStore((state) => state.gasData);
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1> Real-Time Cross-Chain Gas Tracker</h1>
      <h2>💵 Live ETH/USD Price: {usd.toFixed(2)}</h2>
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
