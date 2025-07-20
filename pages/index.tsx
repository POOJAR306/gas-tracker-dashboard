import { useEffect } from 'react'
import { startGasTracking } from '../utils/gasFetcher'
import { useGasStore } from '../store/useGasStore'  
import { fetchEthPrice } from '../utils/uniswapPriceFetcher'
import { useState } from 'react';

export default function Home() {
  const [txAmount, setTxAmount] = useState(0.5);
  const usd = useGasStore((state) => state.usdPrice);
  const gasData = useGasStore((state) => state.chains);
  useEffect(() => {
    startGasTracking()
    fetchEthPrice()

  const interval = setInterval(() => {
    fetchEthPrice()
  }, 15000) // fetch every 15 sec

  return () => clearInterval(interval)
  }, []);
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1> Real-Time Cross-Chain Gas Tracker</h1>
      <h2>Live ETH/USD Price: {usd.toFixed(2)}</h2>
      <label>
       Enter ETH/MATIC/ARB Amount:
      <input
        type="number"
        step="0.01"
        value={txAmount}
        onChange={(e) => setTxAmount(Number(e.target.value))}
        style={{ marginLeft: '10px', padding: '5px' }}
      />
    </label>
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
          {Object.entries(gasData).map(([chain, data]) => {
          const gasFeeInGwei = (data.baseFee + data.priorityFee) * 21000;
          const gasFeeInEth = gasFeeInGwei / 1e9;
          const costUSD = gasFeeInEth * usd;

          return (
            <tr key={chain}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{chain}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.baseFee.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.priorityFee.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                ${costUSD.toFixed(2)}
              </td>
            </tr>
          )
        })}
      </tbody>
      </table>
    </main>
  );
}
