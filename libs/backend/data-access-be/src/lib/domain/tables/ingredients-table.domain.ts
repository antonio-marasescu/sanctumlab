export const IngredientsTableName = 'Ingredients';

export const IngredientsTable = {
    pk: 'INGREDIENTS',
    sk: 'INGREDIENTS#${id}'
};

export const IngredientsTableSchema = {
    pk: { type: String, value: IngredientsTable.pk },
    sk: { type: String, value: IngredientsTable.sk },
    id: {
        type: String,
        generate: 'ulid',
        required: true
    },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    created: { type: String, required: false },
    updated: { type: String, required: false }
};
