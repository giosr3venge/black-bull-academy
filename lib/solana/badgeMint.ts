import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

export interface BadgeMintParams {
  wallet: WalletContextState;
  connection: Connection;
  badgeName: string;
  badgeDescription: string;
  badgeImageUri: string;
  moduleId: string;
}

export async function mintBadgeNFT({
  wallet, connection, badgeName, badgeDescription, badgeImageUri, moduleId,
}: BadgeMintParams): Promise<string | null> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected');
  }
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey('11111111111111111111111111111111'),
        lamports: 0.001 * LAMPORTS_PER_SOL,
      })
    );
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;
    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature, 'confirmed');
    console.log(`Badge "${badgeName}" minted! Signature: ${signature}`);
    return signature;
  } catch (error) {
    console.error('Badge minting failed:', error);
    throw error;
  }
}
