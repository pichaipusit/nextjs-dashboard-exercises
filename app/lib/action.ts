"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";

// TODO:
// 1. Force convering any type from amount to number
// 2. Status only accept 'pending' and 'paid'
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.string(),
  status: z.string(),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // TODO:
  // 1. Validate formData from users
  // 2. Make sure u get a new invoices data to show on client side
  const { customerId, amount, status } = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };
  // Test it out:
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
}
