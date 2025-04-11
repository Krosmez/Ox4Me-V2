import type { NextApiRequest, NextApiResponse } from 'next'

const events = [
    { title: 'Événement existant', date: '2025-04-10' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(events)
    } else if (req.method === 'POST') {
        const newEvent = req.body
        events.push(newEvent)
        res.status(201).json(newEvent)
    } else {
        res.status(405).end()
    }
}