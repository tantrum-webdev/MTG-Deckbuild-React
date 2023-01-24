const endpoints = {
  base: import.meta.env.VITE_BASE_API,

  cards: '/cards',
  card: '/cards/{id}',
  sets: '/sets',
  set: '/set/{id}',
  booster: '/sets/{id}/booster',
  types: '/types',
  subtypes: '/subtypes',
  supertypes: '/supertypes',
  formats: '/formats',
};

export default endpoints;
