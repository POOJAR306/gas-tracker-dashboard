import { useEffect } from 'react'
import { startGasTracking } from '../utils/gasFetcher'

export default function Home() {
  const gas = useGasStore((state) => state.gasData)
  useEffect(() => {
    startGasTracking()
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
    <h1>⛽ Real-Time Cross-Chain Gas Tracker</h1>
    <p>Fetching live gas prices from Ethereum, Polygon, and Arbitrum...</p>

    <ul>
      <li>Ethereum: {gas.ethereum?.toFixed(2) || 'Loading...'} gwei</li>
      <li>Polygon: {gas.polygon?.toFixed(2) || 'Loading...'} gwei</li>
      <li>Arbitrum: {gas.arbitrum?.toFixed(2) || 'Loading...'} gwei</li>
    </ul>
    </main>
  )
}
