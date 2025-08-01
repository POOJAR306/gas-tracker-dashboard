import { JsonRpcProvider, ethers } from 'ethers'
import { useGasStore } from '../store/useGasStore'
import type { EventLog } from 'ethers'

const UNISWAP_POOL = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640' // ETH/USDC
const UNISWAP_ABI = [
  'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)'
]
const provider = new JsonRpcProvider( `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`)


export const fetchEthPrice = async () => {
  const contract = new ethers.Contract(UNISWAP_POOL, UNISWAP_ABI, provider)

  const latestBlock = await provider.getBlockNumber()
  const fromBlock = latestBlock - 100

  const logs = await contract.queryFilter('Swap', fromBlock, latestBlock)

  if (logs.length === 0) return

  const lastLog = logs[logs.length - 1] as EventLog
  const sqrtPriceX96 = lastLog.args?.sqrtPriceX96

  const sqrtPrice = Number(sqrtPriceX96.toString())
  const price = (sqrtPrice ** 2 * 1e12) / 2 ** 192

  useGasStore.getState().setUsdPrice(price)

  console.log(`Live ETH/USD: $${price.toFixed(2)}`)
}
