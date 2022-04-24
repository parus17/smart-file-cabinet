import {AzureFunction, Context, HttpRequest} from "@azure/functions"
import {CosmosClient} from "@azure/cosmos";
import {randomUUID} from "crypto";
import {Boek} from "./model/boek";

const endpoint = process.env.COSMOS_DB_HOST;
const key = process.env.COSMOS_DB_MASTER_KEY;
const databaseId = "smart-file-cabinet";
const containerId = "boeken";

const client = new CosmosClient({endpoint, key});

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const {database} = await client.databases.createIfNotExists({id: databaseId});
    const {container} = await database.containers.createIfNotExists({id: containerId});

    // let boeken: Boek[] = [
    //     {
    //         id: randomUUID(),
    //         auteur: "Colin Dexter",
    //         titel: "Morse's greatest mistery",
    //         isbn: "0-330-34025-5",
    //         status: "In boekenkast"
    //     },
    //     {
    //         id: randomUUID(),
    //         auteur: "Dick Francis",
    //         titel: "Comeback",
    //         isbn: "0-330-32486-1",
    //         status: "In boekenkast"
    //     }
    // ];

    // await Promise.all(boeken.map((itemDef: any) => container.items.create(itemDef)));

    let boeken = await container.items.readAll().fetchAll();

    context.log(boeken);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: boeken.resources
    };
};

export default httpTrigger;
