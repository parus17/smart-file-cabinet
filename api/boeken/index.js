const {CosmosClient} = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_HOST;
const key = process.env.COSMOS_DB_MASTER_KEY;
const databaseId = "smart-file-cabinet";
const containerId = "boeken";

const client = new CosmosClient({endpoint, key});

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const {database} = await client.databases.createIfNotExists({id: databaseId});
    const {container} = await database.containers.createIfNotExists({id: containerId});

    const boeken = await container.items.readAll().fetchAll();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: boeken.resources
    };
}
