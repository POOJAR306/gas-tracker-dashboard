import { useEffect } from 'react'
import { startGasTracking } from '../utils/gasFetcher'

export default function Home() {
  useEffect(() => {
    startGasTracking()
  }, [])

  return (
    <div>
      <h1>⛽ Real-Time Gas Tracker</h1>
    </div>
  )
}
