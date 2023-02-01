import { Client, Stomp, StompConfig, StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import { socketURL } from "../dataManager/apiConfig";
import { getCookies } from "../dataManager/cookie";

interface ObjectType {
  [key: string]: any;
}

let stompClient: Client;
let isConnected = false;
const subscriptions: { [key: string]: StompSubscription } = {};

export function useStomp(config?: StompConfig, callback?: () => void) {
  const connect = useCallback(() => {
    if (!stompClient) {
      const socket = new SockJS(`${socketURL}/ws/chat`);
      //   stompClient = new Client(config);
      stompClient = Stomp.over(() => {
        return socket;
      });
      stompClient.activate();
    }
    stompClient.onConnect = (frame) => {
      console.log("useStomp ... onConnect", frame);
      isConnected = true;
      callback && callback();
    };
  }, []);

  const send = useCallback(
    (path: string, body: ObjectType, headers?: ObjectType) => {
      stompClient.publish({
        destination: path,
        headers: { AccessToken: getCookies("accesstoken") },
        body: JSON.stringify(body),
      });
    },
    [stompClient]
  );

  const subscribe = useCallback(
    <T>(path: ObjectType, callback: (msg: T) => void) => {
      if (!stompClient) return;

      if (subscriptions[path.path]) return;
      const subscription = stompClient.subscribe(`${path.path}/${path.roomId}`, (message) => {
        const body: T = JSON.parse(message.body);
        callback(body);
      });
      subscriptions[path.path] = subscription;
    },
    []
  );

  const unsubscribe = useCallback((path: string) => {
    subscriptions[path].unsubscribe();
    delete subscriptions[path];
  }, []);

  const disconnect = useCallback(() => {
    stompClient.deactivate();
  }, [stompClient]);

  useEffect(() => {
    connect();
  }, []);

  return {
    disconnect,
    subscribe,
    unsubscribe,
    subscriptions,
    send,
    isConnected,
  };
}
