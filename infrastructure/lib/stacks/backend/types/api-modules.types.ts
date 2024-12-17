export type ApiRestResourceConfig = {
    [resource: string]: {
        methods: string[];
        subResources?: ApiRestResourceConfig;
    };
};
