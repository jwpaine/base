import { getDbClient } from "~/db.server";

export async function getSitesForOwner(email: string) {
  console.log("getting sites for user: ", email)
  const client = await getDbClient();
  try {
    const res = await client.query(
      `SELECT domain FROM sites WHERE owner = $1`,
      [email]
    );
    return res.rows;
  } catch (err) {
    console.error("Error getting sites for user:", err);
    throw err;
  } finally {
    client.release();
  }
}

export async function getSiteData(domain: string) {
    console.log("getting site data for domain: ", domain)
    const client = await getDbClient();
    try {
      const res = await client.query(
        `SELECT data FROM sites WHERE domain = $1`,
        [domain]
      );
      return res.rows[0].data;
    } catch (err) {
      console.error("Error getting data", err);
      throw err;
    } finally {
      client.release();
    }
  }

export async function updateSiteData(domain: string, email: string, data: JSON) {
    console.log("updating site data for user: ", email)
    const client = await getDbClient();
    try {
      const res = await client.query(
        `UPDATE sites SET data = $1 WHERE domain = $2 AND owner = $3`,
        [data, domain, email]
      );
      return res.rows
    } catch (err) {
      console.error("Error updating data", err);
      throw err;
    } finally {
      client.release();
    }
  }
