import { getSdk } from "./register_group";



async function main() {
    console.log('start');
    const devAccount = '0x0fdc2e54cf89c312ca75cf22828d7618a278e70b';
    const sdk = await getSdk();
    console.log('start2');
    const avatar = await sdk.getAvatar(devAccount);
    console.log('start3');
    const trustRelations = await avatar.getTrustRelations();
    console.log('oi');
    console.log('trust relations', trustRelations);
}

main().then(d => console.log('done')).catch((e) => console.log(e)).finally(() => process.exit());