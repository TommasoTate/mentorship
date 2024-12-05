import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ''} ${last_name || ''}`.trim();

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerkId, id),
    });

    if (existingUser) {
      // Update existing user
      await db
        .update(users)
        .set({
          name,
          email,
          avatarUrl: image_url,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id));
    } else {
      // Create new user with default role as 'founder'
      // Note: In a real app, you might want to handle role assignment differently
      await db.insert(users).values({
        clerkId: id,
        name,
        email,
        avatarUrl: image_url,
        role: 'founder',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return new Response('', { status: 200 });
} 