/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { z } from 'zod';
import { JSX, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface EventInput {
    title: string;
    date: string;
}

export default function Page() {

    const [open, setOpen] = useState<boolean>(false);
    const [events, setEvents] = useState<EventInput[]>([]);
    const formattedEvents: EventInput[] = events.map((event: any) => ({
        title: event.name,
        date: event.startAt
    }));
    const [selectedDate, setSelectedDate] = useState<string>('');
    const formSchema = z.object({
        title: z.string()
            .min(2, {
                message: "Le titre doit faire au moins 2 caractères",
            }).max(50, {
                message: "Le titre doit faire au maximum 50 caractères",
            }).refine((val) => val.trim() !== '', {
                message: "Le titre ne peut pas être vide",
            }),
        date: z.string()
            .refine((val) => val.trim() !== '', {
                message: "La date ne peut pas être vide",
            })
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: undefined,
            date: undefined,
        },
    });

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
            });
    }, []);

    const handleDateClick = async (arg: any) => {
        setSelectedDate(arg.dateStr);
        setOpen(true);
    };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    date: selectedDate,
                }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de l\'enregistrement de l\'événement');
            }
            const newEvent = await response.json();
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            setOpen(false);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'événement :', error);
        }
    };

    return (
        <main className="w-full">
            <h1 className="text-2xl font-bold mb-4">
                📅 Mon Calendrier
            </h1>
            <Dialog open={ open } onOpenChange={ setOpen }>
                <FullCalendar
                    plugins={ [dayGridPlugin, interactionPlugin] }
                    initialView="dayGridMonth"
                    events={ formattedEvents }
                    dateClick={ handleDateClick }
                    height="auto"
                    editable
                    selectable
                />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Ajouter un événement le { selectedDate } ?
                        </DialogTitle>
                        <DialogDescription>
                            Vous pourrez toujours l&apos;éditer ou le supprimer plus tard.
                        </DialogDescription>
                        <Form { ...form }>
                            <form className="mt-4 flex items-end justify-center gap-4">
                                <FormField
                                    control={ form.control }
                                    name="title"
                                    render={ ({ field }): JSX.Element => (
                                        <FormItem className="w-full">
                                            <FormLabel>Titre de l&apos;évènement <span className="!text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input { ...field } placeholder="Entrez un titre pour votre évènement" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) }
                                />
                                <Button type="submit" className="mt-4" disabled={ form.formState.isSubmitting } onClick={ (e) => {
                                    e.preventDefault();
                                    onSubmit(form.getValues());
                                } }>
                                    { form.formState.isSubmitting ? 'Enregistrement...' : 'Enregistrer' }
                                </Button>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </main >
    );
}
