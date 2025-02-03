//Typography.tsx
import { THEMECOLORS } from "./ThemeColor";

export const TYPOGRAPHY = {
    heading1: { fontWeight: "bold" as const, color: THEMECOLORS.textPrimaryColor },
    heading2: { fontWeight: "600" as const, color: THEMECOLORS.textPrimaryColor },
    heading3: { fontWeight: "600" as const, color: THEMECOLORS.textPrimaryColor },
    body: { fontWeight: "400" as const, color: THEMECOLORS.textPrimaryColor },
    subText: { fontWeight: "400" as const, color: THEMECOLORS.textsecondaryColor },
    buttonText: { fontWeight: "800" as const, color: THEMECOLORS.buttonText },
};
