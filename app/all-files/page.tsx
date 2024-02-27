'use server'
import React from "react";
import { list } from '@vercel/blob';
import DelButton from "./delButton";
import { dateFull } from "@/lib/helpers"
import { avatarPath } from "@/constants/urls";


export default async function AllFiles() {
  const {
    // folders, 
    blobs
  } = await list({
    mode: 'folded',
    prefix: avatarPath
  });

  return (
    <div className="mt-20">
      {blobs.map(blob =>
        <div key={blob.url}>
          {dateFull(blob.uploadedAt.toJSON())} {blob.pathname} {blob.url} - <DelButton url={blob.url} />
        </div>
      )}
    </div>
  )


}
