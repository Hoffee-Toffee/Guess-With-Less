export async function up(knex) {
  return knex.schema.createTable('prompts', (table) => {
    table.increments('id')
    table.string('name')
    table.string('category')
    table.string('images')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('prompts')
}
