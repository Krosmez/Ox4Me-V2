import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const user = await getUser();
  const { cocktail_id } = await req.json();

  await prisma.consumed_cocktails_users.create({
    data: { user_id: user.id, cocktail_id },
  });

  return Response.json({ success: true });
}

export async function DELETE(req: Request) {
  const user = await getUser();
  const { cocktail_id } = await req.json();

  await prisma.consumed_cocktails_users.delete({
    where: {
      user_id_cocktail_id: { user_id: user.id, cocktail_id },
    },
  });

  return Response.json({ success: true });
}
