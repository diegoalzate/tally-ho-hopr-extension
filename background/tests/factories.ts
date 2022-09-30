import { keccak256 } from "ethers/lib/utils"
import { AccountBalance, AddressOnNetwork } from "../accounts"
import { ETH, ETHEREUM, OPTIMISM } from "../constants"
import {
  AnyEVMTransaction,
  LegacyEVMTransactionRequest,
  AnyEVMBlock,
  BlockPrices,
} from "../networks"
import {
  ChainService,
  KeyringService,
  LedgerService,
  NameService,
  PreferenceService,
  SigningService,
} from "../services"

const createRandom0xHash = () =>
  keccak256(Buffer.from(Math.random().toString()))

export const createPreferenceService = async (): Promise<PreferenceService> => {
  return PreferenceService.create()
}

export const createKeyringService = async (): Promise<KeyringService> => {
  return KeyringService.create()
}

type CreateChainServiceOverrides = {
  preferenceService?: Promise<PreferenceService>
  keyringService?: Promise<KeyringService>
}

export const createChainService = async (
  overrides: CreateChainServiceOverrides = {}
): Promise<ChainService> => {
  return ChainService.create(
    overrides.preferenceService ?? createPreferenceService(),
    overrides.keyringService ?? createKeyringService()
  )
}

export async function createNameService(overrides?: {
  chainService?: Promise<ChainService>
  preferenceService?: Promise<PreferenceService>
}): Promise<NameService> {
  const preferenceService =
    overrides?.preferenceService ?? createPreferenceService()
  return NameService.create(
    overrides?.chainService ?? createChainService({ preferenceService }),
    preferenceService
  )
}

export const createLedgerService = async (): Promise<LedgerService> => {
  return LedgerService.create()
}

type CreateSigningServiceOverrides = {
  keyringService?: Promise<KeyringService>
  ledgerService?: Promise<LedgerService>
  chainService?: Promise<ChainService>
}

export const createSigningService = async (
  overrides: CreateSigningServiceOverrides = {}
): Promise<SigningService> => {
  return SigningService.create(
    overrides.keyringService ?? createKeyringService(),
    overrides.ledgerService ?? createLedgerService(),
    overrides.chainService ?? createChainService()
  )
}

// Copied from a legacy Optimism transaction generated with our test wallet.
export const createLegacyTransactionRequest = (
  overrides: Partial<LegacyEVMTransactionRequest> = {}
): LegacyEVMTransactionRequest => {
  return {
    chainID: OPTIMISM.chainID,
    estimatedRollupFee: 0n,
    estimatedRollupGwei: 0n,
    from: "0x208e94d5661a73360d9387d3ca169e5c130090cd",
    gasLimit: 342716n,
    gasPrice: 40300000000n,
    input:
      "0x415565b0000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000172370d5cd63279efa6d502dab29171933a610af000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000001c97ae6d863eb400000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000004800000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000172370d5cd63279efa6d502dab29171933a610af000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000241706553776170000000000000000000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000001cbc479eb646b2000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0788a3ad43d79aa53b09c2eacc313a787d1d607000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000172370d5cd63279efa6d502dab29171933a610af000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000172370d5cd63279efa6d502dab29171933a610af00000000000000000000000000000000000000000000000000002499313007fe00000000000000000000000099b36fdbc582d113af36a21eba06bfeab7b9be120000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000099b36fdbc582d113af36a21eba06bfeab7b9be120000000000000000000000000000000000000000000000a45bb7e7a86313733c",
    network: OPTIMISM,
    to: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    type: 0,
    value: 10000000000000000n,
    ...overrides,
  }
}

export const createAnyEVMTransaction = (
  overrides: Partial<AnyEVMTransaction> = {}
): AnyEVMTransaction => {
  return {
    asset: ETH,
    blockHash: createRandom0xHash(),
    blockHeight: 15547463,
    from: "0x208e94d5661a73360d9387d3ca169e5c130090cd",
    gasLimit: 527999n,
    gasPrice: 40300000000n,
    hash: createRandom0xHash(),
    input:
      "0x415565b0000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000f4c83080e80ae530d6f8180572cbbf1ac9d5d43500000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000084784181bd7017cc00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000004a000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000006f05b59d3b20000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000012556e697377617056330000000000000000000000000000000000000000000000000000000000000006f05b59d3b200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002b0d500b1d8e8ef31e21c99d1db9a6444d3adf12700001f42791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000f4c83080e80ae530d6f8180572cbbf1ac9d5d435000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002a0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000002517569636b5377617000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000008521d131bfaa40df000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000f4c83080e80ae530d6f8180572cbbf1ac9d5d435000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f4c83080e80ae530d6f8180572cbbf1ac9d5d43500000000000000000000000000000000000000000000000000a98fb0023a291400000000000000000000000099b36fdbc582d113af36a21eba06bfeab7b9be120000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000099b36fdbc582d113af36a21eba06bfeab7b9be1200000000000000000000000000000000000000000000005ab9dccabd63136f33",
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
    network: OPTIMISM,
    nonce: 156,
    r: "0x1492a3699be79b1c6c0f77505556cc90194ba8fe3317d83ce4075f3292108cd0",
    s: "0xc6480bb00fa6e1f630ec004cdca7c725e6d8e964b8201b9cc6471e750415181",
    to: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    type: 0,
    v: 309,
    value: 500000000000000000n,
    ...overrides,
  }
}

export const createAnyEVMBlock = (
  overrides: Partial<AnyEVMBlock> = {}
): AnyEVMBlock => {
  return {
    hash: createRandom0xHash(),
    parentHash: createRandom0xHash(),
    difficulty: 1000000000000n,
    blockHeight: 15547463,
    timestamp: Date.now(),
    network: OPTIMISM,
    ...overrides,
  }
}

export const createAccountBalance = (
  overrides: Partial<AccountBalance> = {}
): AccountBalance => ({
  address: createRandom0xHash(),
  assetAmount: {
    asset: {
      metadata: {
        tokenLists: [],
      },
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      homeNetwork: ETHEREUM,
      contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
    amount: 5000000n,
  },
  network: ETHEREUM,
  blockHeight: BigInt(15547463),
  retrievedAt: Date.now(),
  dataSource: "alchemy",
  ...overrides,
})

export const createAddressOnNetwork = (
  overrides: Partial<AddressOnNetwork> = {}
): AddressOnNetwork => ({
  address: "0x208e94d5661a73360d9387d3ca169e5c130090cd",
  network: ETHEREUM,
  ...overrides,
})

export const createBlockPrices = (
  overrides: Partial<BlockPrices> = {}
): BlockPrices => ({
  baseFeePerGas: 0n,
  blockNumber: 25639147,
  dataSource: "local",
  estimatedPrices: [
    {
      confidence: 99,
      maxFeePerGas: 0n,
      maxPriorityFeePerGas: 0n,
      price: 1001550n,
    },
  ],
  estimatedTransactionCount: null,
  network: ETHEREUM,
  ...overrides,
})
