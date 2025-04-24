const isMobileSafari =
  typeof navigator !== "undefined" &&
  (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i));

function handleElement(element: HTMLElement) {
  const container = document.createElement("div");
  container.className = "tailwind-plugin-supercolors";
  container.style.position = "absolute";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.zIndex = "999999999999999";
  container.style.pointerEvents = "none";

  if (!isMobileSafari) {
    container.style.backgroundColor = "color(from #fff srgb 8 8 8)";
    container.style.mixBlendMode = "multiply";
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
}

if (typeof window !== "undefined") {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement && node.classList.contains("super")) {
          handleElement(node);
        }
      }
    }
  });

  function listen() {
    document.body.classList.add("tailwind-plugin-supercolors");

    document
      .querySelectorAll(
        [
          ".super",
          ...Array(100)
            .fill(0)
            .map((_, i) => `.super-${i + 1}`),
          "[class*='bg-super-']",
        ].join(",")
      )
      .forEach((node) => {
        if (node instanceof HTMLElement) {
          handleElement(node);
        }
      });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }

  if (!document.body) {
    setTimeout(listen);
  } else {
    listen();
  }
}
