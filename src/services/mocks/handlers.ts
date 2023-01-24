import { rest } from "msw";
import endpoints from "../../config/endpoints";

export const handlers = [
    rest.get(endpoints.base + endpoints.types, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "types": [
                    "Artifact",
                    "Conspiracy",
                    "Creature",
                    'Enchantment',
                    "Instant",
                    "Land",
                    "Phenomenon",
                    "Plane",
                    "Planeswalker",
                    "Scheme",
                    "Sorcery",
                    "Tribal",
                    "Vanguard"
                ]
            }),
        );
    }),
];

