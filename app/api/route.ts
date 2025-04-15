import { NextResponse } from "next/server";

export async function GET() {
    // const cocktails = await fetch("")
    //     .then((res) => res.json())
    //     .then((data) => data.drinks);

    // return NextResponse.json(cocktails);
    return NextResponse.json([
        {
            id: 1,
            name: "Mojito",
            image: "https://www.thecocktaildb.com/images/media/drink/rxtqps1479209380.jpg",
            ingredients: [
                { name: "White Rum", measure: "1 1/2 oz" },
                { name: "Mint", measure: "2-4 leaves" },
                { name: "Lime Juice", measure: "1 oz" },
                { name: "Club Soda", measure: "Top" },
                { name: "Sugar", measure: "2 tsp" },
            ],
        },])
}