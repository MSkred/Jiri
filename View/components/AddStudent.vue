<template>
  <div>
      <div class="container">
      <h1>Ajouter un étudiant</h1>
            <div class="form-group">
                <label for="name">Prénom et nom</label>
                <input v-model="name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control">
            </div>
      </div>
  </div>
</template>

<script>

import VueApollo from 'vue-apollo'
import nanoid from 'nanoid'

export default {
  name: 'add-student',
}
</script>
