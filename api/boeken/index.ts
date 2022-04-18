import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Boek} from "./model/boek";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    let boeken: Boek[] = [
        {
            id: "1",
            auteur: "Colin Dexter",
            titel: "Morse's greatest mistery",
            isbn: "0-330-34025-5",
            status: "In boekenkast"
        },
        {
            id: "2",
            auteur: "Dick Francis",
            titel: "Comeback",
            isbn: "0-330-32486-1",
            status: "In boekenkast"
        }
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: boeken
    };

};

export default httpTrigger;
