export type UserBanner = {
    background: string;
    orientation?: "top" | "left" | "right" | "bottom";
};

// Apparently, vscode's typings are bad and don't include these.
export type CSSStyle = CSSStyleSheet & {
    replace: (css: string) => Promise<CSSStyle>
    cssRules: CSSStyleRule & {
        selectorText: string;
        style: CSSStyleDeclaration
    }[];
};