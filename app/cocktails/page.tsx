import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cocktails } from '@/lib/cocktails';

export default async function Page() {
    return (
        <>
            <h1 className="text-2xl font-bold">Cocktail page</h1>
            <div className="space-y-6 mt-6">
                { cocktails.map((cocktail) => (
                    <Card
                        className="w-1/6 h-fit"
                        key={ cocktail.id }
                    >
                        <CardHeader>
                            <CardTitle>{ cocktail.name }</CardTitle>
                            <CardDescription>Category: { cocktail.category }</CardDescription>
                        </CardHeader>
                        <CardContent>
                            Ingrédients :
                            <ul>
                                { cocktail.ingredients.map((ingredient, index) => (
                                    <li key={ index }>
                                        { ingredient.quantity && `${ingredient.quantity} ` }
                                        { ingredient.name }
                                    </li>
                                )) }
                            </ul>
                        </CardContent>
                    </Card>
                ))
                }
            </div>
        </>
    );
}