'use client'

import { useRouter } from "next/navigation";

interface Props {
  url: string;
}

export default function DelButton({ url }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch('api/file', {
          method: "DELETE",
          body: JSON.stringify({
            url,
          }),
        })
        router.refresh();
      }}
    >DELETE</button >
  )
}
