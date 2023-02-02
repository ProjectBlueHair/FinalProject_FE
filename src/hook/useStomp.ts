import { Client, Stomp, StompConfig, StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import { __stompConnected } from "../component/chat/chatSlice";
import { socketURL } from "../dataManager/apiConfig";
import { getCookies } from "../dataManager/cookie";
import { Chat } from "../model/ChatModel";
import { useAppDispatch } from "../redux/config";

interface ObjectType {
  [key: string]: any;
}

let stompClient: Client;
let isConnected = false;
const subscriptions: { [key: string]: StompSubscription } = {};

export const useStomp = (config?: StompConfig, callback?: () => void) => {
const dispatch = useAppDispatch()
  const connect = useCallback(() => {
    if (!stompClient) {
      const socket = new SockJS(`${socketURL}/ws/chat`);
      stompClient = Stomp.over(() => {
        return socket;
      });
      stompClient.activate();
    }
    stompClient.onConnect = (frame) => {
      console.log("useStomp ... onConnect", frame);
      isConnected = true;
      dispatch(__stompConnected(true))
      callback && callback();
    };
  }, []);

  const send = useCallback(
    (path: string, body: Chat, headers?: ObjectType) => {
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
      console.log("subscribe.... ", subscriptions[path.path]);

      if (subscriptions[path.path]) return;
      const subscription = stompClient.subscribe(
        `${path.path}/${path.roomId}`,
        (message) => {
          const body: T = JSON.parse(message.body);
          callback(body);
        }
      );
      subscriptions[path.path] = subscription;
    },
    []
  );

  const unsubscribe = useCallback((path: string) => {
    subscriptions[path].unsubscribe();
    delete subscriptions[path];
  }, []);

  const disconnect = useCallback(() => {
    console.log('disconnect...');
    stompClient.deactivate();
    dispatch(__stompConnected(false))

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
};
