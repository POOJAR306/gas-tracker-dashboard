import { useEffect, useState } from 'react'
import { startGasTracking } from '../utils/gasFetcher'
import { useGasStore } from '../store/useGasStore'
import { fetchEthPrice } from '../utils/uniswapPriceFetcher'
import GasChart from '../components/GasChart'
import type { SeriesDataItemTypeMap } from 'lightweight-charts'

type CandlestickData = SeriesDataItemTypeMap['Candlestick']

const mockChartData: CandlestickData[] = [
  {
    time: Math.floor(Date.now() / 1000),
    open: 50,
    high: 70,
    low: 45,
    close: 60,
  },
  {
    time: Math.floor(Date.now() / 1000) - 900,
    open: 60,
    high: 80,
    low: 55,
    close: 75,
  },
  {
    time: Math.floor(Date.now() / 1000) - 1800,
    open: 75,
    high: 90,
    low: 70,
    close: 85,
  },
]

export default function Home() {
  const [txAmount, setTxAmount] = useState(0.5)
  const usd = useGasStore((state) => state.usdPrice)
  const gasData = useGasStore((state) => state.chains)

  useEffect(() => {
    startGasTracking()
    fetchEthPrice()

    const interval = setInterval(() => {
      fetchEthPrice()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🚀 Real-Time Cross-Chain Gas Tracker</h1>
      <h2>Live ETH/USD Price: ${usd.toFixed(2)}</h2>

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

      <p>📡 Fetching live gas prices from Ethereum, Polygon, and Arbitrum...</p>

      <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Chain</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Base Fee (gwei)</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Priority Fee (gwei)</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Gas Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(gasData).map(([chain, data]) => {
            const chainData = data as { baseFee: number; priorityFee: number; history: any[] }
            const gasFeeInGwei = (chainData.baseFee + chainData.priorityFee) * 21000
            const gasFeeInEth = gasFeeInGwei / 1e9
            const costUSD = gasFeeInEth * usd

            return (
              <tr key={chain}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{chain}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{chainData.baseFee.toFixed(2)}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{chainData.priorityFee.toFixed(2)}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>${costUSD.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h2 style={{ marginTop: '2rem' }}>📈 Gas Price Volatility (Mock Data)</h2>
      <GasChart data={mockChartData} />
    </main>
  )
}
