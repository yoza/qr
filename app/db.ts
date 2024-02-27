import { ConnectConfig } from 'edgedb/dist/conUtils';
import { createClient } from 'edgedb';
import createAuth from "@edgedb/auth-nextjs/app";


const configCon: ConnectConfig = {
  instanceName: process.env.EDGEDB_INSTANCE,
  secretKey: process.env.EDGEDB_SECRET_KEY,
}

if (process.env.EDGEDB_CLIENT_TLS_SECURITY?.includes("insecure")) {
  configCon.tlsSecurity = "insecure";
}

export const client = createClient(configCon);


export const auth = createAuth(client, {
  baseUrl: process.env.EDGEDB_AUTH_BASE_URL as string
});

export default configCon;
