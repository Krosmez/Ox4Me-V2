import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const user = await getUser();
  const { friend_id } = await req.json();

  await prisma.$executeRawUnsafe(`
    UPDATE "users"
    SET "friends" = array_append("friends", '${friend_id}')
    WHERE id = '${user.id}'
  `);

  return Response.json({ success: true });
}
