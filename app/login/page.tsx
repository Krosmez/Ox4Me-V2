"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {

    const formSchema = z.object({
        email: z.string(),
        password: z.string(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
            password: undefined,
        },
    });

    return (
        <div className="p-6 w-full">
            <div className="mx-auto w-80">
                <h1 className="text-2xl font-bold text-center">Ox4Me</h1>
                <h3 className="text-lg font-bold mt-2">Connexion</h3>
                <p className="text-sm text-muted-foreground">Connecte toi à l&apos;Ox4Me pour accéder à ton calendrier des évènements de l&apos;Oxford Pub</p>
                <Form { ...form }>
                    <form className="mt-4">
                        <FormField
                            control={ form.control }
                            name="email"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez votre email" { ...field } />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="password"
                            render={ ({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Entrez votre mot de passe" { ...field } />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <Button type="submit" className="w-full mt-6">Se connecter</Button>
                    </form>
                </Form>
                <p className="text-center">
                    <span className="text-sm text-muted-foreground">Pas encore de compte ?</span>
                    <Button variant="link" asChild>
                        <Link href="/register">Inscris-toi ici !</Link>
                    </Button>
                </p>
            </div>
        </div>
    );
};