import { getServerTime } from "@/services/world-time";
import type { ReactNode } from "@tanstack/react-router";
import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";

const ServerTimeContext = createContext<number | null>(null);

export function ServerTimeProvider({ children }: { children: ReactNode }) {
  const [serverOffsetMs, setServerOffsetMs] = useState<number | null>(null);
  const [serverNow, setServerNow] = useState<number | null>(null);

  useEffect(() => {
    const syncTime = async () => {
      try {
        const t0 = Date.now();
        const data = await getServerTime();
        const t1 = Date.now();

        const serverTime = dayjs(data.datetime).utc(true).toDate().getTime();
        const clientMidpoint = (t0 + t1) / 2;
        const offset = serverTime - clientMidpoint;

        setServerOffsetMs(offset);
        setServerNow(Date.now() + offset);
      } catch {
        setServerNow(Date.now());
      }
    };

    syncTime();
  }, []);

  useEffect(() => {
    if (serverOffsetMs === null) return;

    const interval = setInterval(() => {
      setServerNow(Date.now() + serverOffsetMs);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [serverOffsetMs]);

  return (
    <ServerTimeContext.Provider value={serverNow}>
      {children}
    </ServerTimeContext.Provider>
  );
}

export function useServerTimeContext() {
  return useContext(ServerTimeContext);
}
