// store/useGasStore.ts
import create from 'zustand'
type GasPoint = {
  time: number
  open: number
  high: number
  low: number
  close: number
}

type ChainGasData = {
  baseFee: number
  priorityFee: number
  history: GasPoint[]
}

type ChainName = 'ethereum' | 'polygon' | 'arbitrum'

interface GasStore {
  mode: 'live' | 'simulation'
  usdPrice: number
  chains: {
    ethereum: ChainGasData
    polygon: ChainGasData
    arbitrum: ChainGasData
  }
  setMode: (mode: 'live' | 'simulation') => void
  setUsdPrice: (price: number) => void
  updateChainFees: (chain: ChainName, data: Partial<ChainGasData>) => void
  addToHistory: (chain: ChainName, point: GasPoint) => void
}

export const useGasStore = create<GasStore>((set) => ({
  mode: 'live',
  usdPrice: 0,
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },
  setMode: (mode) => set({ mode }),
  setUsdPrice: (price) => set({ usdPrice: price }),
  updateChainFees: (chain, data) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: {
          ...state.chains[chain],
          ...data,
        },
      },
    })),
  addToHistory: (chain, point) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: {
          ...state.chains[chain],
          history: [...state.chains[chain].history, point],
        },
      },
    })),
}))
