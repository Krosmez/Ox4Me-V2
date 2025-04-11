"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'

interface EventInput {
    title: string
    date: string
}

export default function Page() {
    const [events, setEvents] = useState<EventInput[]>([])

    // Charger depuis l'API locale
    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDateClick = async (arg: any) => {
        const title = prompt('Titre de l’événement :')
        if (title) {
            const newEvent = { title, date: arg.dateStr }

            // Envoyer à l'API
            await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent)
            })

            setEvents([...events, newEvent])
        }
    }

    return (
        <main className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📅 Mon Calendrier</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                height="auto"
                editable
                selectable
            />
        </main>
    )
}
