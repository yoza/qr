'use client'
/* Core */
import React, { useRef } from "react";
import { Provider } from 'react-redux';
import { makeStore, AppStore } from "@/lib/redux";


export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
