"use client";

import CocktailCard from '@/components/custom/CocktailCard';
import { Switch } from '@/components/ui/switch';
import { Cocktail } from '@/models';
import { useEffect, useState } from 'react';

export default function Page() {

    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [favCocktails, setFavCocktails] = useState<Cocktail[]>([]);
    const [showOnlyFav, setShowOnlyFav] = useState<boolean>(false);

    useEffect((): void => {
        const savedCocktails: string | null = localStorage.getItem('favCocktails');
        if (savedCocktails) {
            setFavCocktails(JSON.parse(savedCocktails));
        }

        fetch('/api/cocktails')
            .then((res) => res.json())
            .then((data) => setCocktails(data))
            .catch((error) => console.error('Error fetching cocktails:', error));
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    🍹 Les Cocktails
                </h1>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
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
        </>
    );
};