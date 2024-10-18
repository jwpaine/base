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

  export async function getPreviewData(domain: string, email: string) {
    console.log("getting preview data for domain: ", domain)
    const client = await getDbClient();
    try {
      const res = await client.query(
        `SELECT preview, status FROM sites WHERE domain = $1 and owner = $2`,
        [domain, email]
      );
      console.log("preview data -->", res.rows[0])
      return res.rows[0]
    } catch (err) {
      console.error("Error getting data", err);
      throw err;
    } finally {
      client.release();
    }
  }

  export async function updatePreviewData(domain: string, email: string, data: JSON) {
    console.log("updating preview data for domain: ", domain)
    const client = await getDbClient();
    try {
      const res = await client.query(
        `UPDATE sites SET preview = $1, status = 'unpublished' WHERE domain = $2 AND owner = $3`,
        [data, domain, email]
      );
      return res.rows
    } catch (err) {
      console.error("Error updating preview data", err);
      throw err;
    } finally {
      client.release();
    }
  }

  export async function publishPreviewData(domain: string, email: string) {
    console.log("publishing preview data for domain: ", domain)
    const client = await getDbClient();
    try {
      const res = await client.query(
        `UPDATE sites SET data = preview, status = 'published' WHERE domain = $1 AND owner = $2`,
        [domain, email]
      );
      return res.rows
    } catch (err) {
      console.error("Error publishing preview data", err);
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
