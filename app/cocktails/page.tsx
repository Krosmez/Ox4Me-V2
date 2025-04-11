"use client";

import CocktailCard from '@/components/CocktailCard';
import { Switch } from '@/components/ui/switch';
import { cocktails } from '@/lib/cocktails';
import { Cocktail } from '@/models';
import { useEffect, useState } from 'react';

export default function Page() {

    const [favCocktails, setFavCocktails] = useState<Cocktail[]>([]);
    const [showOnlyFav, setShowOnlyFav] = useState<boolean>(false);

    useEffect((): void => {
        const savedCocktails: string | null = localStorage.getItem('favCocktails');
        if (savedCocktails) {
            setFavCocktails(JSON.parse(savedCocktails));
        }
    }, []);

    return (
        <div className="px-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Cocktail page</h1>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="show-fav"
                        className="ml-2 text-sm"
                    >
                        Afficher seulement les favoris
                    </label>
                    <Switch
                        id="show-fav"
                        checked={ showOnlyFav }
                        onCheckedChange={ setShowOnlyFav }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                { showOnlyFav ? favCocktails.map((cocktail: Cocktail) => (
                    <CocktailCard
                        key={ cocktail.id }
                        cocktail={ cocktail }
                        favCocktails={ favCocktails }
                        setFavCocktails={ setFavCocktails }
                    />
                ))
                    :
                    cocktails.map((cocktail: Cocktail) => (
                        <CocktailCard
                            key={ cocktail.id }
                            cocktail={ cocktail }
                            favCocktails={ favCocktails }
                            setFavCocktails={ setFavCocktails }
                        />
                    ))
                }
            </div>
        </div>
    );
};