"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {

    const formSchema = z.object({
        name: z.string()
            .min(2, { message: "Le nom doit faire au moins 2 caractères" })
            .max(50, { message: "Le nom doit faire au maximum 50 caractères" })
            .refine((val) => val.trim() !== '', {
                message: "Le nom ne peut pas être vide",
            }),
        email: z.string()
            .email({ message: "L'email doit être valide" })
            .refine((val) => val.trim() !== '', {
                message: "L'email ne peut pas être vide",
            }),
        password: z.string()
            .min(8, { message: "Le mot de passe doit faire au moins 8 caractères" })
            .max(50, { message: "Le mot de passe doit faire au maximum 50 caractères" })
            .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une lettre minuscule" })
            .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })
            .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
            .regex(/[^a-zA-Z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial" })
            .refine((val) => val.trim() !== '', {
                message: "Le mot de passe ne peut pas être vide",
            }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
            email: undefined,
            password: undefined,
        },
    });

    return (
        <div className="p-6 w-full">
            <div className="mx-auto w-80">
                <h1 className="text-2xl font-bold text-center">Ox4Me</h1>
                <h3 className="text-lg font-bold mt-2">Inscription</h3>
                <p className="text-sm text-muted-foreground">Crée ton compte pour accéder à l&apos;Ox4Me</p>
                <Form { ...form }>
                    <form className="space-y-4 mt-4">
                        <FormField
                            control={ form.control }
                            name="name"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nom <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez votre nom" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Le nom doit faire au moins 2 caractères et au maximum 50 caractères.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="email"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez votre email" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        L&apos;email doit être valide.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="password"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Mot de passe <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Entrez votre mot de passe" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Le mot de passe doit faire au moins 8 caractères, contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <Button type="submit" className="w-full">Se connecter</Button>
                    </form>
                </Form>
                <p className="text-center">
                    <span className="text-sm text-muted-foreground">Déjà inscrit ?</span>
                    <Button variant="link" asChild>
                        <Link href="/login">
                            Connecte-toi ici !
                        </Link>
                    </Button>
                </p>
            </div>
        </div>
    );
}