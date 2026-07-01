type ManifestChunk = {
    file: string;
    name: string;
    src?: string;
    isEntry?: boolean;
    imports?: string[];
    css?: string[];
    assets?: string[];
};

type Manifest = Record<string, ManifestChunk>;

type EntrySummary = {
    file: string;
    css: string[];
    imports: string[];
    assets: string[];
};

export const parseManifest = (
    manifest: Manifest,
    entry: string,
    base = "/",
): EntrySummary => {
    base = base === "/" ? "" : base.replace(/\/$/, "");
    const withBase = (path: string): string => `${base}/${path}`;

    const summary: EntrySummary = {
        file: "",
        css: [],
        imports: [],
        assets: [],
    };

    const addUnique = (list: string[], value: string): void => {
        if (!list.includes(value)) {
            list.push(value);
        }
    };


    const visited = new Set<string>();
    const walk = (id: string): void => {
        if (visited.has(id)) return;
        visited.add(id);

        const chunk = manifest[id];
        if (!chunk) return;

        if (chunk.isEntry) {
            summary.file = withBase(chunk.file);
        }

        chunk.css?.forEach(css => addUnique(summary.css, withBase(css)));
        chunk.assets?.forEach(asset => addUnique(summary.assets, withBase(asset)));

        chunk.imports?.forEach(dep => {
            const imported = manifest[dep];
            if (imported) {
                addUnique(summary.imports, withBase(imported.file));
            }
            walk(dep);
        });
    };

    walk(entry);

    return summary;
};