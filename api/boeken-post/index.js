const {CosmosClient} = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_HOST;
const key = process.env.COSMOS_DB_MASTER_KEY;
const databaseId = "smart-file-cabinet";
const containerId = "boeken";

const client = new CosmosClient({endpoint, key});

module.exports = async function (context, req) {
    const {database} = await client.databases.createIfNotExists({id: databaseId});
    const {container} = await database.containers.createIfNotExists({id: containerId});

    const boekToCreate = {
        id: req.body.id,
        auteur: req.body.auteur,
        titel: req.body.titel,
        isbn: req.body.isbn,
        status: req.body.status,
    };

    const { resource: boek } = await container.items.create(boekToCreate);

    context.res = {
        body: boek
    };
}
