"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, signup } from './actions';
import { JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page(): JSX.Element {

    return (
        <div className="p-6 w-full">
            <div className="mx-auto w-80">
                <h1 className="text-2xl font-bold text-center">Ox4Me</h1>
                <p className="text-sm text-muted-foreground mt-2">Connecte toi à l&apos;Ox4Me pour accéder à ton calendrier des évènements de l&apos;Oxford Pub</p>
                <Tabs defaultValue="login" className="mt-2 w-full">
                    <TabsList className="grid w-full grid-cols-2 [&>*]:cursor-pointer">
                        <TabsTrigger value="login" className="w-full text-center">Connexion</TabsTrigger>
                        <TabsTrigger value="signup" className="w-full text-center">Inscription</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <form className="space-y-2">
                            <label htmlFor="email">Email :</label>
                            <Input id="email" name="email" type="email" required />
                            <label htmlFor="password">Mot de passe :</label>
                            <Input id="password" name="password" type="password" required />
                            <p className="text-sm text-muted-foreground">Mot de passe oublié ? <a href="/forgot-password" className="text-blue-500 hover:underline">Clique ici</a></p>
                            <Button className="w-full" formAction={ login }>Se connecter</Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="signup">
                        <form className="space-y-2">
                            <label htmlFor="name">Nom :</label>
                            <Input id="name" name="name" type="text" required />
                            <label htmlFor="email">Email :</label>
                            <Input id="email" name="email" type="email" required />
                            <label htmlFor="password">Mot de passe :</label>
                            <Input id="password" name="password" type="password" required />
                            <p className="text-sm text-muted-foreground">Un email va t&apos;être envoyé pour confirmer ton adresse email.</p>
                            <Button className="w-full" formAction={ signup }>S&apos;inscrire</Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    );
};