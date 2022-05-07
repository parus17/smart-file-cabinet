const {CosmosClient} = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_HOST;
const key = process.env.COSMOS_DB_MASTER_KEY;
const databaseId = "smart-file-cabinet";
const containerId = "boeken";

const client = new CosmosClient({endpoint, key});

module.exports = async function (context, req) {
    const {database} = await client.databases.createIfNotExists({id: databaseId});
    const {container} = await database.containers.createIfNotExists({id: containerId});

    const id = req.params.id;

    const deleteResponse = await container.item(id).delete();

    context.res = {
        body: deleteResponse
    };
}
