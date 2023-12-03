export async function up(knex) {
  return knex.schema.createTable('sd-prompts', (table) => {
    table.increments('id')
    table.string('name')
    table.string('category')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('sd-prompts')
}
