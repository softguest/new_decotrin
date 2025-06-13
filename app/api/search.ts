import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /**
       * Search posts
       */
      const schools: Array<User> = await db.user.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: query,
                // mode: "insensitive",
              },
            },
          ],
        }
      });
      await db.searchQuery.create({
        data: {
          query,
        },
      });

      res.status(200).json({ schools });
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}
