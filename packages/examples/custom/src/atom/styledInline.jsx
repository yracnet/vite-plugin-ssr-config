import { useContext } from "react";
import { StyleSheetContext } from "styled-components";

// FIX: SSR Styled
export const StyledInline = import.meta.env.SSR
  ? () => {
      const { styleSheet } = useContext(StyleSheetContext);
      const __html = styleSheet?.toString();
      return (
        <style
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{ __html }}
        ></style>
      );
    }
  : () => null;
