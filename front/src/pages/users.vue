<template>
  <div>
    <TableMaker
      title="Users"
      :data = data
      :pagination = "{
        sortBy: 'id',
        rowsPerPage: 10,
        page: 1,
        descending: false
      }"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TableMaker from 'components/TableMaker'

export default defineComponent({
  name: 'Register',
  components: { TableMaker },
  setup () {
    const data = ref([
      {
        id: 1,
        name: 'Omar',
        lastName: 'Torres Bueno',
        age: 33,
        sex: true
      },
      {
        id: 2,
        name: 'Yusnavi',
        lastName: 'Gonzales Lugo',
        age: 29,
        sex: false
      },
      {
        id: 3,
        name: 'Arthas',
        lastName: 'Torres Gonzalez',
        age: 8,
        sex: true
      },
      {
        id: 4,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 5,
        name: 'Yusnavi',
        lastName: 'Gonzales Lugo',
        age: 29,
        sex: false
      },
      {
        id: 6,
        name: 'Arthas',
        lastName: 'Torres Gonzalez',
        age: 8,
        sex: true
      },
      {
        id: 7,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 8,
        name: 'Yusnavi',
        lastName: 'Gonzales Lugo',
        age: 29,
        sex: false
      },
      {
        id: 9,
        name: 'Arthas',
        lastName: 'Torres Gonzalez',
        age: 8,
        sex: true
      },
      {
        id: 10,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 11,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 12,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 13,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 14,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      },
      {
        id: 15,
        name: 'Sylvanas',
        lastName: 'Torres Gonzalez',
        age: 5,
        sex: false
      }
    ])
    return {
      data
    }
  }
})
</script>
