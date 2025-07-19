import { useEffect } from 'react'
import { startGasTracking } from '../utils/gasFetcher'

export default function Home() {
  useEffect(() => {
    startGasTracking()
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>⛽ Real-Time Cross-Chain Gas Tracker</h1>
      <p>Fetching live gas prices from Ethereum, Polygon, and Arbitrum...</p>
    </main>
  )
}
