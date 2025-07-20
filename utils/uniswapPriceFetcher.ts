import { JsonRpcProvider, ethers } from 'ethers'
import { useGasStore } from '../store/useGasStore'
import type { EventLog } from 'ethers'

const UNISWAP_POOL_ADDRESS = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640' // ETH/USDC
const UNISWAP_ABI = [
  'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)'
]

export const fetchEthPrice = async () => {
  const provider = new JsonRpcProvider(process.env.ETHEREUM_WSS)

  const contract = new ethers.Contract(UNISWAP_POOL_ADDRESS, UNISWAP_ABI, provider)

  const latestBlock = await provider.getBlockNumber()
  const fromBlock = latestBlock - 100

  const logs = await contract.queryFilter('Swap', fromBlock, latestBlock)

  if (logs.length === 0) return

  const lastLog = logs[logs.length - 1]
  const sqrtPriceX96 = lastLog.args?.sqrtPriceX96

  const sqrtPrice = Number(sqrtPriceX96.toString())
  const price = (sqrtPrice ** 2 * 1e12) / 2 ** 192

  useGasStore.getState().setUsdPrice(price)

  console.log(`Live ETH/USD: $${price.toFixed(2)}`)
}
