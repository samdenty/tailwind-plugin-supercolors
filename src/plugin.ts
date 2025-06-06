import plugin from "tailwindcss/plugin";

function transformColor(color: string, strength: number) {
  const percent = strength / (100 / 1.7 / 2);

  return `color(from ${color} srgb calc(r * ${percent}) calc(g * ${percent}) calc(b * ${percent}))`;
}

export const tailwindPlugin = plugin(
  ({ matchUtilities, addUtilities, theme, addBase }) => {
    const colorUtilities = [
      "bg",
      "text",
      "border",
      "ring",
      "ring-offset",
      "divide",
      "outline",
      "decoration",
      "placeholder",
      "from",
      "via",
      "to",
      "shadow",
    ];

    // Trick to making unclamped colors work:
    // https://github.com/ardov/hdr-web
    addBase({
      "html::after": {
        position: "absolute",
        top: 0,
        left: 0,
        background:
          "url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/4gKMSUNDX1BST0ZJTEUAAQEAAAJ8AAAAAARAAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAFxyWFlaAAABWAAAABRnWFlaAAABbAAAABRiWFlaAAABgAAAABR3dHB0AAABlAAAABRyVFJDAAABqAAAAIxnVFJDAAABqAAAAIxiVFJDAAABqAAAAIxjaWNwAAACNAAAAAxjcHJ0AAACQAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAD4AAAAcAFIAZQBjADIAMAAyADAAIABHAGEAbQB1AHQAIAB3AGkAdABoACAASABMAEcAIABUAHIAYQBuAHMAZgBlAHIAAFhZWiAAAAAAAACsaAAAR2////+BWFlaIAAAAAAAACppAACs4wAAB61YWVogAAAAAAAAIAcAAAuuAADME1hZWiAAAAAAAAD21gABAAAAANMtY3VydgAAAAAAAABAAAAADQAuAF8AoQDxAVABvAI2Ar0DUgPyBKAFWQYeBvAHzQi1CaoKqQu0DMoN7A8XEE4RkBLcFDMVlBcAGHYZ+BuGHTMfBiEAIyYlfCgFKsUtwTD/NIM4VTx5QPhF2EsjUOBXGl3bZS9tIHW+fxeJOpQ4oCKtD7sTykXawOyg//9jaWNwAAAAAAkSAAFtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb//gAPTGF2YzYwLjMuMTAwAP/bAEMACAQEBAQEBQUFBQUFBgYGBgYGBgYGBgYGBgcHBwgICAcHBwYGBwcICAgICQkJCAgICAkJCgoKDAwLCw4ODhERFP/EAEwAAQEAAAAAAAAAAAAAAAAAAAAFAQEBAAAAAAAAAAAAAAAAAAAABBABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/AABEIAAEAAQMBEgACEgADEgD/2gAMAwEAAhEDEQA/AKQjFA//2Q==)",
        height: "1px",
        width: "1px",
        display: "block",
        content: `''`,
        opacity: 0.001,
      },
    } as any);

    const superUtility = (strength: number) => ({
      position: "relative",
      overflow: "hidden",
      ".tailwind-plugin-supercolors": {
        opacity: `${strength / 100}`,
      },
    });

    // For each utility type that accepts colors
    colorUtilities.forEach((utilityType) => {
      const utility = (strength?: number) => (value: string) => {
        const colorValue = transformColor(value, strength ?? 50);

        if (utilityType === "bg") {
          return {
            "body.tailwind-plugin-supercolors &": {
              ...superUtility(strength ?? 100),
              "background-color": value,
            },
            "body:not(.tailwind-plugin-supercolors) &": {
              "background-color": colorValue,
            },
          };
        }

        switch (utilityType) {
          case "bg":
            return { "background-color": colorValue };
          case "text":
            return { color: colorValue };
          case "border":
            return { "border-color": colorValue };
          case "ring":
            return { "--tw-ring-color": colorValue };
          case "ring-offset":
            return { "--tw-ring-offset-color": colorValue };
          case "divide":
            return { "--tw-divide-color": colorValue };
          case "outline":
            return { "outline-color": colorValue };
          case "decoration":
            return { "text-decoration-color": colorValue };
          case "placeholder":
            return { "&::placeholder": { color: colorValue } };
          case "from":
            return {
              "--tw-gradient-from": colorValue,
              "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to, rgb(255 255 255 / 0))`,
            };
          case "via":
            return {
              "--tw-gradient-stops": `var(--tw-gradient-from), ${colorValue}, var(--tw-gradient-to, rgb(255 255 255 / 0))`,
            };
          case "to":
            return { "--tw-gradient-to": colorValue };
          case "shadow":
            return { "--tw-shadow-color": colorValue };
          default:
            return { [utilityType]: colorValue };
        }
      };

      for (let strength = 0; strength <= 100; strength++) {
        // Register a new utility with the 'super-' prefix
        matchUtilities(
          { [`${utilityType}-super-${strength}`]: utility(strength) } as any,
          { values: theme("colors") }
        );
      }

      matchUtilities(
        {
          [`${utilityType}-super`]: utility(),
        } as any,
        {
          values: theme("colors"),
        }
      );
    });

    for (let strength = 0; strength <= 100; strength++) {
      addUtilities({
        [`.super-${strength}`]: superUtility(strength),
      });
    }

    addUtilities({
      [".super"]: superUtility(100),
    });
  }
) as any;
