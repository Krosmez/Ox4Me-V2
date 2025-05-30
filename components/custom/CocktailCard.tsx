import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Cocktail } from '@/models';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface CocktailCardProps {
    cocktail: Cocktail;
    favCocktails: Cocktail[];
    setFavCocktails: (cocktails: Cocktail[]) => void;
}

export default function CocktailCard({ cocktail, favCocktails, setFavCocktails }: CocktailCardProps) {

    const isFavCocktail: (cocktail: Cocktail) => boolean = (cocktail: Cocktail): boolean => {
        return favCocktails.some(favCocktail => favCocktail.id === cocktail.id);
    };

    return (
        <Card
            className={ `flex flex-col justify-between gap-0 p-0 ${isFavCocktail(cocktail) ? 'outline outline-green-500' : ''}` }
            key={ cocktail.id }
        >
            <CardHeader className="text-center p-4">
                <CardTitle className="flex items-center justify-center gap-1">
                    <p>{ cocktail.name }</p>
                </CardTitle>
                <CardDescription>{ cocktail.category }</CardDescription>
            </CardHeader>
            <div>
                <CardContent className="px-0 relative">
                    <Image
                        src={ `/cocktail.webp` }
                        alt={ cocktail.name }
                        width={ 500 }
                        height={ 500 }
                    />
                    { isFavCocktail(cocktail) && <Star className="absolute top-2 right-2 fill-yellow-500 stroke-1" size={ 48 } /> }
                </CardContent>
                <CardFooter className="flex flex-col gap-2 p-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="mx-auto w-full"
                            >
                                Détails
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{ cocktail.name }</DialogTitle>
                                <DialogDescription>
                                    <ul>
                                        { cocktail.ingredients.map((ingredient) => (
                                            <li key={ ingredient.name }>{ ingredient.name } { ingredient.quantity ?? '' }</li>
                                        )) }
                                    </ul>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                    >
                                        Fermer
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button
                        className="mx-auto w-full"
                        onClick={ () => {
                            if (!isFavCocktail(cocktail)) {
                                setFavCocktails([...favCocktails, cocktail]);
                                localStorage.setItem('favCocktails', JSON.stringify([...favCocktails, cocktail]));
                            } else {
                                const updatedCocktails: Cocktail[] = favCocktails.filter(favCocktail => favCocktail.id !== cocktail.id);
                                setFavCocktails(updatedCocktails);
                                localStorage.setItem('favCocktails', JSON.stringify(updatedCocktails));
                            }
                        } }
                    >
                        { isFavCocktail(cocktail) ? 'Retirer des favoris' : 'Ajouter aux favoris' }
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
