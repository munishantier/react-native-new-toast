import { Component, ReactNode } from "react";

declare module "react-native-new-toast" {
  export interface DURATION {
    LENGTH_SHORT: number;
    FOREVER: number;
  }
  export default class Toast extends Component {
    show: (
      text: string | ReactNode,
      isShowIcon: boolean | ReactNode,
      duration?: number,
      callback?: (() => void)
    ) => void;
    close: (duration?: number) => void;
  }
}
