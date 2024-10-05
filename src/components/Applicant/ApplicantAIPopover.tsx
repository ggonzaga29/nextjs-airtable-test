"use client";
import useClickOutside from "~/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { useRef, useState, useEffect, useId } from "react";
import { Button } from "~/components/ui/Button";
import { AiRecommend } from "@carbon/icons-react";
import { generateAIRecommendation, getSavedAIRecommendation } from "~/lib/actions";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

const MotionButton = motion(Button);

export default function ApplicantAIPopover({
  id,
  position,
  description,
}: {
  id: string;
  position?: string;
  description?: string;
}) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<string>("Click 'Generate' to get AI Recommendation");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const getRecommendation = async () => {

      setNote("Loading AI Recommendation...");
      const text = await getSavedAIRecommendation(id);

      setNote(text ?? "Click 'Generate' to get AI Recommendation");
    }

    getRecommendation();
  }, [id, isOpen]);

  const getRecommendation = async (id: string, position?: string, description?: string, ) => {
    if (!position || !description) {
      console.error("Position and Description are required.");
      return;
    }

    console.log("Generating AI Recommendation...");
    setNote("Generating AI Recommendation...");

    const text = await generateAIRecommendation({
      position,
      description,
      id
    });


    setNote(text ?? "")
  }

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <MotionButton
          variant="outline"
          size="icon"
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50"
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
          title="Analyze Applicant with AI"
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="text-sm"
          >
            <AiRecommend size={16} />
          </motion.span>
        </MotionButton>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute h-[250px] w-[364px] overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700 z-10"
              style={{
                borderRadius: 12,
              }}
            >
              <div
                className="flex h-full flex-col"
              >
                <motion.span
                  layoutId={`popover-label-${uniqueId}`}
                  aria-hidden="true"
                  style={{
                    opacity: note ? 0 : 1,
                  }}
                  className="absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400"
                ></motion.span>
                <code
                  className="max-h-[200px] overflow-y-auto h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
                >
                  {note}
                </code>
                <div key="close" className="flex justify-between px-4 py-3 border-t">
                  <button
                    type="button"
                    className="flex items-center cursor-pointer"
                    onClick={closeMenu}
                    aria-label="Close popover"
                  >
                    <ArrowLeftIcon
                      size={16}
                      className="text-zinc-900 dark:text-zinc-100"
                    />
                  </button>
                  <button
                    className="relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
                    onClick={() => {
                      console.log(position, description);
                      getRecommendation(id, position, description);
                    }}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
