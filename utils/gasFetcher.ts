import { ethers } from 'ethers'
import { useGasStore } from '../store/useGasStore'

const ALCHEMY_KEYS = {
  ethereum: 'wss://eth-mainnet.g.alchemy.com/v2/YOUR_ETH_KEY',
  polygon: 'wss://polygon-mainnet.g.alchemy.com/v2/YOUR_POLYGON_KEY',
  arbitrum: 'wss://arb-mainnet.g.alchemy.com/v2/YOUR_ARBITRUM_KEY'
}

export const startGasTracking = () => {
  Object.entries(ALCHEMY_KEYS).forEach(([chain, wsUrl]) => {
    const provider = new ethers.providers.WebSocketProvider(wsUrl)

    provider.on('block', async (blockNumber) => {
      try {
        const block = await provider.getBlock(blockNumber)

        const baseFee = block.baseFeePerGas
          ? parseFloat(ethers.utils.formatUnits(block.baseFeePerGas, 'gwei'))
          : 0

        const priorityFee = 2 // Simulated

        useGasStore.getState().updateChainFees(chain as any, {
          baseFee,
          priorityFee
        })

        console.log(`[${chain}] Block #${blockNumber} | Base: ${baseFee} | Priority: ${priorityFee}`)
      } catch (err) {
        console.error(`[${chain}] Error reading block ${blockNumber}:`, err)
      }
    })

    provider._websocket.on('error', (err: any) => {
      console.error(`WebSocket error on ${chain}:`, err)
    })

    provider._websocket.on('close', () => {
      console.warn(`WebSocket closed on ${chain}, reconnecting in 3s...`)
      setTimeout(() => startGasTracking(), 3000)
    })
  })
}
