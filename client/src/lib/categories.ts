// Single source of truth for category code <-> Vietnamese label.
// Used by Post.tsx, PostTitle.tsx, Sidebar.tsx, home and category pages.

export const CATEGORY_LABELS: Record<string, string> = {
    "buon-ban": "Buôn bán",
    "tam-su": "Tâm sự",
    "cong-nghe": "Công nghệ"
};

export const CATEGORY_CODES = Object.keys(CATEGORY_LABELS);

export const formatCategory = (code: string): string =>
    CATEGORY_LABELS[code] ?? code;

export const isAllowedCategory = (code: string): boolean =>
    code in CATEGORY_LABELS;
