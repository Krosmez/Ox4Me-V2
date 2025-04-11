"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cocktails } from '@/lib/cocktails';
import { Cocktail } from '@/models';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page() {

    const [favCocktails, setFavCocktails] = useState<Cocktail[]>([]);

    useEffect(() => {
        const savedCocktails: string | null = localStorage.getItem('favCocktails');
        if (savedCocktails) {
            setFavCocktails(JSON.parse(savedCocktails));
        }
    }, []);

    const isFavCocktail: (cocktail: Cocktail) => boolean = (cocktail: Cocktail) => {
        return favCocktails.some(favCocktail => favCocktail.id === cocktail.id);
    };

    return (
        <div className="px-6">
            <h1 className="text-2xl font-bold">Cocktail page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                { cocktails.map((cocktail) => (
                    <Card
                        className={ `flex flex-col justify-between gap-4 ${isFavCocktail(cocktail) ? 'bg-green-100' : ''}` }
                        key={ cocktail.id }
                    >
                        <CardHeader className="text-center">
                            <CardTitle>
                                { isFavCocktail(cocktail) ? '⭐' : '' }
                                { cocktail.name }
                                { isFavCocktail(cocktail) ? '⭐' : '' }
                            </CardTitle>
                            <CardDescription>{ cocktail.category }</CardDescription>
                        </CardHeader>
                        <div>
                            <CardContent className="px-0">
                                <Image
                                    src={ `/cocktail.webp` }
                                    alt={ cocktail.name }
                                    width={ 150 }
                                    height={ 150 }
                                    className="size-full"
                                />
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2 mt-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="mx-auto w-full">
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
                                                <Button type="button" variant="secondary">
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
                                    { favCocktails.some(favCocktail => favCocktail.id === cocktail.id) ? 'Retirer des favoris' : 'Ajouter aux favoris' }
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))
                }
            </div>
        </div>
    );
};