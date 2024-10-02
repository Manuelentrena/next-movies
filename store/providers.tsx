"use client";

import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
