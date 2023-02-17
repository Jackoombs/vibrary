import { createPortal } from "react-dom";

interface Props {
  children: JSX.Element;
}

export const Modal = ({ children }: Props) => {
  const root = document.getElementById("root");

  return (
    <>
      {root &&
        createPortal(
          <div
            className="font relative z-10 font-sans"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div className="relative w-full transform overflow-hidden rounded-lg bg-primary p-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                  {children}
                </div>
              </div>
            </div>
          </div>,
          root
        )}
    </>
  );
};
