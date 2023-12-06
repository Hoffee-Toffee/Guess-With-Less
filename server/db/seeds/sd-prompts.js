export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sd-prompts').del()

  // Inserts seed entries
  await knex('sd-prompts').insert([
    { id: 1, name: 'Bear', category: 'Animals' },
    { id: 2, name: 'Cat', category: 'Animals' },
    { id: 3, name: 'Giraffe', category: 'Animals' },
    { id: 4, name: 'Hippo', category: 'Animals' },
    { id: 5, name: 'Pug', category: 'Animals' },
    { id: 6, name: 'Tiger', category: 'Animals' },
    { id: 7, name: 'Walter White', category: 'Humans' },
    { id: 8, name: 'Red Panda', category: 'Animals' },
    { id: 10, name: 'Mango', category: 'Fruits' },
    { id: 11, name: 'Apple', category: 'Fruits' },
    { id: 12, name: 'Banana', category: 'Fruits' },
    { id: 13, name: 'Bee', category: 'Animals' },
    { id: 14, name: 'Watermelon', category: 'Fruits' },
    { id: 15, name: 'Wolf', category: 'Animals' },
    { id: 16, name: 'Strawberry', category: 'Fruits' },
    { id: 17, name: 'Pineapple', category: 'Fruits' },
    { id: 18, name: 'Sean Penn', category: 'Humans' },
    { id: 19, name: 'Tristan', category: 'Humans' },
    { id: 20, name: 'Lime', category: 'Fruits' },
    { id: 21, name: 'Lemon', category: 'Fruits' },
    { id: 22, name: 'Cherry', category: 'Fruits' },
    { id: 23, name: 'Pear', category: 'Fruits' },
    { id: 24, name: 'Avocado', category: 'Fruits' },
    { id: 25, name: 'Grape', category: 'Fruits' },
    { id: 26, name: 'Blueberry', category: 'Fruits' },
    { id: 27, name: 'Steve', category: 'Humans' },
    { id: 28, name: 'Vin Diesel', category: 'Humans' },
    { id: 29, name: 'Bruce Willis', category: 'Humans' },
    { id: 30, name: 'Sean Connery', category: 'Humans' },
    { id: 31, name: 'Sean Bean', category: 'Humans' },
    { id: 32, name: 'Drew Barrymore', category: 'Humans' },
    { id: 33, name: 'David Bowie', category: 'Humans' },
    { id: 34, name: 'Donkey', category: 'Animals' },
  ])
}
