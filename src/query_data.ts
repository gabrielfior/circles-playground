//import { CirclesRpc } from "@circles-sdk/data/dist/circlesRpc";
//import { CirclesQuery } from "@circles-sdk/data/dist/pagedQuery/circlesQuery";
//import { PagedQueryParams } from "@circles-sdk/data/dist/pagedQuery/pagedQueryParams";

import { CirclesQuery, CirclesRpc, PagedQueryParams } from "@circles-sdk/data";


const queryDefinition: PagedQueryParams = {
    namespace: 'V_Crc',
    table: 'Avatars',
    columns: [
        'blockNumber',
        'transactionIndex',
        'logIndex',
        'avatar',
        'name',
        'cidV0Digest'
    ],
    filter: [
        {
            Type: 'FilterPredicate',
            FilterType: 'Equals',
            Column: 'type',
            Value: 'group'
        }
    ],
    sortOrder: 'ASC',
    limit: 100
};

async function main() {
    console.log('start');
    console.log('start2');
    const circlesRpc = new CirclesRpc('https://chiado-rpc.aboutcircles.com');
    const query = new CirclesQuery(circlesRpc, queryDefinition);
    let hasResults = await query.queryNextPage();
    console.log('results', hasResults);
    while (hasResults) {
        const rows = query.currentPage?.results;
        rows?.forEach(row => console.log(row));
        hasResults = await query.queryNextPage(); // this updates next page
    }
}


main().then(d => console.log('done')).finally(() => process.exit(1));