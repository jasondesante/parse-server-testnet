import Moralis from 'moralis';

export interface RequestMessage {
  address: string;
  chain: string;
  networkType: string;
}

const DOMAIN = 'ApeTapes.xyz';
const STATEMENT = 'Please sign this message to log in to Ape Tapes.';
const URI = 'https://apetapes.xyz';
const EXPIRATION_TIME = '2033-01-01T00:00:00.000Z';
const TIMEOUT = 15;

export async function requestMessage({
  address,
  chain,
  networkType,
}: {
  address: string;
  chain: string;
  networkType: 'evm';
}) {
  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    networkType,
    domain: DOMAIN,
    statement: STATEMENT,
    uri: URI,
    expirationTime: EXPIRATION_TIME,
    timeout: TIMEOUT,
  });

  const { message } = result.toJSON();

  return message;
}
