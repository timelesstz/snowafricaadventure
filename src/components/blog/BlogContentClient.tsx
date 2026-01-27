"use client";

import { useEffect } from "react";

export function BlogContentClient() {
  useEffect(() => {
    // Initialize FAQ accordions
    const faqContainers = document.querySelectorAll(".faq-container");

    faqContainers.forEach((container) => {
      const items = container.querySelectorAll(".faq-item");

      items.forEach((item) => {
        const button = item.querySelector(".faq-button");
        const content = item.querySelector(".faq-content");
        const icon = item.querySelector(".faq-icon");

        if (button && content && icon) {
          button.addEventListener("click", () => {
            const isOpen = content.classList.contains("max-h-96");

            // Close all items in this container
            items.forEach((otherItem) => {
              const otherContent = otherItem.querySelector(".faq-content");
              const otherIcon = otherItem.querySelector(".faq-icon");
              if (otherContent && otherIcon) {
                otherContent.classList.add("max-h-0");
                otherContent.classList.remove("max-h-96");
                otherIcon.classList.remove("rotate-180");
              }
            });

            // Toggle current item if it was closed
            if (!isOpen) {
              content.classList.remove("max-h-0");
              content.classList.add("max-h-96");
              icon.classList.add("rotate-180");
            }
          });
        }
      });
    });

    // Cleanup function
    return () => {
      faqContainers.forEach((container) => {
        const buttons = container.querySelectorAll(".faq-button");
        buttons.forEach((button) => {
          button.replaceWith(button.cloneNode(true));
        });
      });
    };
  }, []);

  return null;
}
