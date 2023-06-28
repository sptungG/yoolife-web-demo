import { AriaToastProps, useToast, useToastRegion } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { ToastQueue, useToastQueue } from "@react-stately/toast";
import { useRef } from "react";
import { Button } from "react-aria-components";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type TToast = {
  title?: string;
  description?: string;
  state?: string;
};

export const toastQueue = new ToastQueue<TToast>({
  maxVisibleToasts: 5,
});

type ToastProps = AriaToastProps<TToast> & {
  state: ToastState<TToast>;
};

function Toast({ state, ...props }: ToastProps) {
  const ref = useRef(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } = useToast(
    props,
    state,
    ref,
  );

  return (
    <div
      {...toastProps}
      ref={ref}
      className={twMerge(
        "flex items-center gap-4 rounded-lg bg-primary-200 px-4 py-3 text-white shadow-md",
        props.toast.content.state === "success" ? "bg-green-400" : "",
        props.toast.content.state === "error" ? "bg-red-500" : "",
        props.toast.content.state === "invalid" ? "bg-yellow-400" : "",
      )}
    >
      <div {...titleProps}>{props.toast.content.title}</div>
      <div {...descriptionProps}>{props.toast.content.description}</div>
      <Button {...closeButtonProps}>x</Button>
    </div>
  );
}

type TGlobalToastRegionProps = {};

function GlobalToastRegion({}: TGlobalToastRegionProps) {
  const stateQueue = useToastQueue<TToast>(toastQueue);
  const ref = useRef(null);
  const { regionProps } = useToastRegion({}, stateQueue, ref);

  // Render toast region.
  return stateQueue.visibleToasts.length > 0
    ? createPortal(
        <div
          {...regionProps}
          ref={ref}
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 outline-none"
        >
          {stateQueue.visibleToasts.map((toast) => (
            <Toast key={toast.key} toast={toast} state={stateQueue} />
          ))}
        </div>,
        document.body,
      )
    : null;
}

export default GlobalToastRegion;
