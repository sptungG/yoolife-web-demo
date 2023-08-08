import { Button } from "react-aria-components";

function OverlayButton(props: any) {
  return (
    <Button
      {...props}
      className="inline-flex cursor-pointer items-center justify-center rounded-md  bg-primary-250 bg-clip-padding px-5 py-2 font-medium text-white outline-none transition-colors data-[hovered]:bg-opacity-30 data-[pressed]:bg-opacity-40 data-[focus-visible]:ring-2 data-[focus-visible]:ring-white/75 sm:text-sm"
    />
  );
}

export default OverlayButton;