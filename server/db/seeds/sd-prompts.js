export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sd-prompts').del()

  // Inserts seed entries
  await knex('sd-prompts').insert([
    { id: 1, name: 'Bear', category: 'Animals'},
    { id: 2, name: 'Cat', category: 'Animals'},
    { id: 3, name: 'Giraffe', category: 'Animals'},
    { id: 4, name: 'Hippo', category: 'Animals'},
    { id: 5, name: 'Pug', category: 'Animals'},
    { id: 6, name: 'Tiger', category: 'Animals'},
    { id: 7, name: 'Walter White', category: 'Humans'},
    { id: 8, name: 'Red Panda', category: 'Animals'},
    { id: 10, name: 'Mango', category: 'Fruits'},
    { id: 11, name: 'Apple', category: 'Fruits'},
    { id: 12, name: 'Banana', category: 'Humans'},
    { id: 13, name: 'Bee', category: 'Animals'},
    { id: 14, name: 'Watermelon', category: 'Fruits'},
    { id: 15, name: 'Wolf', category: 'Animals'},
    { id: 16, name: 'Strawberry', category: 'Fruits'},
    { id: 17, name: 'Pineapple', category: 'Fruits'},
    { id: 18, name: 'Sean Penn', category: 'Humans'},
  ]
)}