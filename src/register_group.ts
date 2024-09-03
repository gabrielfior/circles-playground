import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers";
import { Sdk, CirclesConfig  } from "@circles-sdk/sdk";
import { ZeroHash } from "ethers";
import ethers from "ethers";

const avatarAddress = "0x0FDc2E54CF89C312Ca75cf22828d7618A278e70b";
const mintPolicy = "0x2470B43fc3303fCa660E68c86e3bEb8CE353C556";
const groupName = "my-group-name";
const groupSymbol = "my-group-symbol";


export const config: CirclesConfig = {
    pathfinderUrl: 'https://pathfinder.aboutcircles.com',
    circlesRpcUrl: 'https://rpc.helsinki.aboutcircles.com',
    v1HubAddress: '0x29b9a7fbb8995b2423a71cc17cf9810798f6c543',
    v2HubAddress: '0x7bC1F123089Bc1f384b6379d0587968d1CD5830a',
    migrationAddress: '0xEaBa6046103C3A2f5A681fD4323f78C647Fb4292',
    profileServiceUrl: 'https://chiado-pathfinder.aboutcircles.com/profiles/',
    nameRegistryAddress: "0xb95ef3f3e693531d9588815bca954dc8dce30937",
};

// export async function getRunner(): Promise<SdkContractRunner> {
//     const provider = new JsonRpcProvider(config.circlesRpcUrl);
//     const signer = await provider.getSigner();
//     const address = await signer.getAddress();
//     console.log ("signer address", address);

//     return {
//         runner: signer,
//         address: address
//     };
// }

async function getAdapter(){
    console.log('entered get adapter1');
    const adapter = new BrowserProviderContractRunner();
    console.log('entered get adapter2');
    await adapter.init();
    console.log('entered get adapter3');
    return adapter;
}

export async function getSdk() {
    console.log('entered sdk')
    //const runner = await getRunner();
    const adapter = await getAdapter();
    return new Sdk(config, adapter);
}

async function main() {
    const sdk = await getSdk();
    const avatar = await sdk.getAvatar(avatarAddress);
    console.log(avatar.address);
    const avatarInt = await sdk.registerGroupV2(mintPolicy, groupName, groupSymbol, ZeroHash);
    console.log('avatar int', avatarInt);
}

main().then(d => console.log('done')).finally(() => process.exit());