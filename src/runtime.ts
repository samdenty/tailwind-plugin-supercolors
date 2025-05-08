const isMobileSafari =
  typeof navigator !== "undefined" &&
  (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i));

function handleElement(element: HTMLElement) {
  // Check if element already has the container
  if (element.querySelector('.tailwind-plugin-supercolors')) {
    return;
  }
  
  const container = document.createElement("div");
  container.className = "tailwind-plugin-supercolors";
  container.style.position = "absolute";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.mixBlendMode = "multiply";
  container.style.zIndex = "999999999999999";
  container.style.top = "0";

  if (!isMobileSafari) {
    container.style.backgroundColor = "color(from #fff srgb 8 8 8)";
  }

  const video = document.createElement("video");
  container.appendChild(video);

  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.src =
    "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAvG1kYXQAAAAfTgEFGkdWStxcTEM/lO/FETzRQ6gD7gAA7gIAA3EYgAAAAEgoAa8iNjAkszOL+e58c//cEe//0TT//scp1n/381P/RWP/zOW4QtxorfVogeh8nQDbQAAAAwAQMCcWUTAAAAMAAAMAAAMA84AAAAAVAgHQAyu+KT35E7gAADFgAAADABLQAAAAEgIB4AiS76MTkNbgAAF3AAAPSAAAABICAeAEn8+hBOTXYAADUgAAHRAAAAPibW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAKcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAw10cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAKcAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAACnAAAAAAABAAAAAAKFbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABdwAAAD6BVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAixtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAHsc3RibAAAARxzdHNkAAAAAAAAAAEAAAEMaHZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAHVodmNDAQIgAAAAsAAAAAAAPPAA/P36+gAACwOgAAEAGEABDAH//wIgAAADALAAAAMAAAMAPBXAkKEAAQAmQgEBAiAAAAMAsAAAAwAAAwA8oBQgQcCTDLYgV7kWVYC1CRAJAICiAAEACUQBwChkuNBTJAAAAApmaWVsAQAAAAATY29scm5jbHgACQAQAAkAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAALPwAACz8AAAAKHN0dHMAAAAAAAAAAwAAAAIAAAPoAAAAAQAAAAEAAAABAAAD6AAAABRzdHNzAAAAAAAAAAEAAAABAAAAEHNkdHAAAAAAIBAQGAAAAChjdHRzAAAAAAAAAAMAAAABAAAAAAAAAAEAAAfQAAAAAgAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAABvAAAAGQAAABYAAAAWAAAAFHN0Y28AAAAAAAAAAQAAACwAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjYwLjMuMTAw";
  video.currentTime = 0;

  video.style.background = "color(from #fff srgb 999 999 999)";
  video.style.mixBlendMode = isMobileSafari ? "multiply" : "difference";
  video.style.objectFit = "cover";
  video.style.width = "100%";
  video.style.height = "100%";

  element.prepend(container);
  
  // Ensure video plays
  video.play().catch(err => {
    console.warn("Autoplay prevented:", err);
  });
}

if (typeof window !== "undefined") {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Check for added nodes
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          // Check if the node itself has the super class
          if (node.classList.contains("super") || 
              Array.from(node.classList).some(cls => cls.startsWith("super-"))) {
            handleElement(node);
          }
          
          // Also check children of added nodes
          node.querySelectorAll(".super, [class*='super-']").forEach(el => {
            if (el instanceof HTMLElement) {
              handleElement(el);
            }
          });
        }
      }
      
      // Also check for attribute changes
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'class' &&
          mutation.target instanceof HTMLElement) {
        const target = mutation.target as HTMLElement;
        if (target.classList.contains("super") || 
            Array.from(target.classList).some(cls => cls.startsWith("super-"))) {
          handleElement(target);
        }
      }
    }
  });

  function listen() {
    document.body.classList.add("tailwind-plugin-supercolors");

    // Initial scan for elements with super classes
    const superElements = document.querySelectorAll(
      [
        ".super",
        ...Array(101)
            .fill(0)
            .map((_, i) => `.super-${i}`),
        "[class*='bg-super-']",
      ].join(",")
    );
    
    superElements.forEach((node) => {
      if (node instanceof HTMLElement) {
        handleElement(node);
      }
    });

    // Start observing for changes
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      childList: true,
    });
    
    console.log("Super colors runtime initialized with", superElements.length, "elements");
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', listen);
  } else {
    listen();
  }
}